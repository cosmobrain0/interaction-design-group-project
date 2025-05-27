import pandas as pd
import datetime


def format(file: str):
    f = open(f"{file}", "r", encoding="utf8")
    lines = f.readlines()
    n = len(lines)
    lines1 = [lines[0]]
    for i in range(1, n-1):
        if lines[i-1] == '\n' and lines[i+1] == '\n':
            i += 1
        else:
            lines1.append(lines[i])
    lines1.append(lines[-1])
    blocks = []
    block = []
    for line in lines1:
        line = line.replace("’", "'").replace("–", "—")
        if line == '\n':
            if block:
                blocks.append(block)
            block = []
        else:
            block.append(line.strip())
    blocks.append(block)

    months = {
        "Jan": 1,
        "Feb": 2,
        "Mar": 3,
        "Apr": 4,
        "May": 5,
        "Jun": 6,
        "June": 6,
        "Jul": 7,
        "Aug": 8,
        "Sep": 9,
        "Oct": 10,
        "Nov": 11,
        "Dec": 12
    }
    for i in range(len(blocks)):
        date = blocks[i][0].split(":")[0].split("/")[0].split()
        datestr = f"2025-{pad(str(months[date[0]]))}-{pad(date[1])}"
        blocks[i] = [datestr, blocks[i][0], blocks[i][3]]
    return blocks

def pad(x):
    if len(x) == 1:
        return "0" + x
    return x

if __name__ == "__main__":
    data = format("rawdata/rawcalendar.txt")
    df = pd.DataFrame(data, columns=["date", "title", "contents"])
    df = df.reset_index(names=["id"]).transpose()
    df.to_json("assets/data/calendar.json")
    