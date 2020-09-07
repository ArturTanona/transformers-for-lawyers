class Observable:
    def __init__(self):
        self.result = None

    def callback(self, result):
        self.result = result

    def format_response(self):
        results = []
        for d in self.result.search.docs:
            for idx, match in enumerate(d.matches):
                score = match.score.value
                if score <= 0.0:
                    continue
                results.append(
                    {"match": match.text,
                     "id": match.parent_id,
                     "start": match.location[0],
                     "end": match.location[1],
                     "score": float(match.score.value)})
        results = sorted(results, key=lambda x: x["score"])
        return results
