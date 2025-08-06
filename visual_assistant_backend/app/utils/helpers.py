def generate_summary(events):
    if not events:
        return "No significant events detected."

    summary = []
    seen = set()

    for event in events:
        label = event["label"]
        timestamp = event["timestamp"]

        if label not in seen:
            summary.append(f"Detected {label} around {timestamp} seconds.")
            seen.add(label)

    return " ".join(summary)
