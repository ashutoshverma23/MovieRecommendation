import os
import re
import pandas as pd


def extract_year(year_val):
    """
    Safely extract a 4-digit year integer (e.g. 1995, 2023) from the year column,
    handling integers, strings, and messy entries like 'XV2016' or 'V2020'.
    Returns None if no 4-digit year is present.
    """
    if pd.isna(year_val):
        return None
    val_str = str(year_val).strip()
    match = re.search(r"(19\d{2}|20\d{2})", val_str)
    if match:
        return int(match.group(1))
    return None


def segregate_movies(
    input_csv="IMDB-Movie-Dataset(2023-1951).csv",
    output_90s_to_latest="movies_1990_to_latest.csv",
    output_1951_to_1989="movies_1951_to_1989.csv",
):
    print(f"Reading dataset: {input_csv}...")
    if not os.path.exists(input_csv):
        raise FileNotFoundError(f"Input file not found: {input_csv}")

    # Read dataset
    df = pd.read_csv(input_csv)
    print(f"Total records in dataset: {len(df)}")

    # Extract parsed year
    parsed_years = df["year"].apply(extract_year)

    # 1. 1990 to latest (90s to latest)
    mask_90s_to_latest = parsed_years >= 1990
    df_90s_to_latest = df[mask_90s_to_latest]

    # 2. 1951 to 1989
    mask_1951_to_1989 = (parsed_years >= 1951) & (parsed_years <= 1989)
    df_1951_to_1989 = df[mask_1951_to_1989]

    # Other records (e.g. before 1951 or missing year)
    mask_other = ~(mask_90s_to_latest | mask_1951_to_1989)
    df_other = df[mask_other]

    # Save segregated files
    df_90s_to_latest.to_csv(output_90s_to_latest, index=False)
    df_1951_to_1989.to_csv(output_1951_to_1989, index=False)

    print("\n--- Segregation Summary ---")
    print(f"1990 to Latest ({output_90s_to_latest}): {len(df_90s_to_latest)} movies")
    print(f"1951 to 1989   ({output_1951_to_1989}): {len(df_1951_to_1989)} movies")
    print(f"Other / Unparsed (before 1951 or no year): {len(df_other)} movies")
    print("----------------------------\n")
    print("Files created successfully!")


if __name__ == "__main__":
    segregate_movies()
