import pandas as pd


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
    for i in range(len(blocks)):
        blocks[i] = [blocks[i][0], blocks[i][3]]
    return blocks

if __name__ == "__main__":
    data = format("rawdata/rawcalendar.txt")
    df = pd.DataFrame(data, columns=["title", "contents"])
    df = df.reset_index(names=["id"]).transpose()
    df.to_json("assets/data/calendar.json")
    