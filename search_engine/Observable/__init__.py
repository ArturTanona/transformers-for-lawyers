import pickle
class Observable:
    def __init__(self):
        self.result = None

    def callback(self, result):

        self.result = result

    def format_response(self):

        results = []
        docs_id_to_path = {i['id']: i['tags']['id_document'] for i in self.result['search']['docs'][0]['matches']}
        data = self.result['search']['docs'][0]['chunks'][0]['matches']
        for idx, match in enumerate(data):

            try:
                score = match['score']['value']
            except KeyError:
                continue
            if score <= 0.0:
                continue
            results.append(
                {"match": match['text'],
                 "start": match['location'][0],
                 "end": match['location'],
                 "score": score,
                 "id": docs_id_to_path[match['parentId']].split("/")[-1]})
        results = sorted(results, key=lambda x: x["score"])

        return  results
