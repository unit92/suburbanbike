import json 
from geojson import Point, Feature, FeatureCollection, dump
suburbs = []
features = []
with open("SUBURBS.txt") as f:
    suburbslist = f.read().splitlines()
    for j in range(len(suburbslist)):
        suburbslist[j] = suburbslist[j].lower()
    print (suburbslist)    
with open('sydneydata.json') as g:
    data = json.load(g)
    for i in data['features']:
        if i['id'].lower() in suburbslist :
            suburbs.append(i)
feature_collection = FeatureCollection(suburbs)
with open('visited.json', 'w') as h:
    dump(feature_collection, h)


    
