import sys
import json
import math

script_name = sys.argv[0]
args = sys.argv[1:]
print(args)

with open("src\FourButtonEnglishText\words-btree-array.json") as jsonFile:
    data = jsonFile.read()
    data = data.strip("\"")
    jsonObject = json.loads(data)
    jsonFile.close()

def convertBase26ToList(n):
    l = []
    while(n > 1):
        l.append(n%26)
        n = math.floor(n/26)
    return l[::-1]

def convertBase26ListToString(l):
    s = ""
    for i in l:
        c = chr(i+97)
        s += c
    return s

def convertBase26ToString(n):
    return convertBase26ListToString(convertBase26ToList(n))

def convertStringToBase26List(s):
    l = []
    for c in s:
        l.append(ord(c)-97)
    return l

def convertListToBase26(l):
    n = 1
    for i in l:
        n = n*26 + i
    return n

def convertStringToBase26(s):
    return convertListToBase26(convertStringToBase26List(s))

def findString(s, implicitBTree):
    index = 1
    while(implicitBTree[index]):
        convertedString = convertBase26ToString(implicitBTree[index])
        if convertedString < s:
            # Head Right
            index = index * 2 + 1
        elif convertedString > s:
            # Head Left
            index = index * 2
        else:
            return index, True
    lastTrueIndex = math.floor(index / 2)
    return lastTrueIndex, False

def insertString(s, implicitBTree):
    index, found = findString(s, implicitBTree)
    if(found):
        print("String " + s + " found!")
        print(index)
        return
    print("String " + s + " not found, last index checked:")
    print(index)
    print("Adding string to node:")
    node = convertBase26ToString(implicitBTree[index])
    print(node)
    convertedBase26 = convertStringToBase26(s)
    if(node < s):
        print("Right")
        implicitBTree[2*index+1] = convertedBase26
    else:
        print("Left")
        implicitBTree[2*index] = convertedBase26
    print("Writing to file...")
    with open('src\FourButtonEnglishText\words-btree-array.json', 'w') as jsonFile:
        jsonFile.write('"' + json.dumps(implicitBTree) + '"')
    print("File written")

for s in args:
    insertString(s, jsonObject)
