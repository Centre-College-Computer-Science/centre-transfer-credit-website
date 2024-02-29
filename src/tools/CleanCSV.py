import sys
import csv
def main():
    input_file_name = "..\\" + sys.argv[1]
    output_file_name = "..\\" + sys.argv[2]
    print(input_file_name)
    institutions = {}
    with open(input_file_name, newline = '') as csvfile:
        spamreader = csv.reader(csvfile, delimiter = ',', quotechar = '|')
        for row in spamreader:
            if row[1] in institutions:
                if not row[6] in institutions[row[1]]:
                    institutions[row[1]][row[6]] = row
            if not row[1] in institutions:
                institutions[row[1]] = {row[6]: row}

    with open(output_file_name, 'w', newline = '') as csvfile:
        spamwriter = csv.writer(csvfile, skipinitialspace=False, delimiter=',',quotechar = '|', quoting  = csv.QUOTE_MINIMAL)
        for row in institutions:
            for courseRow in institutions.get(row):
                spamwriter.writerow(institutions.get(row).get(courseRow))

        
main()