# Geography data policy

The geography dataset is curated and version-controlled. UI code must never silently invent or change a geography convention.

## Europe learning scope v1

The first Europe deck contains **50 learning items**.

It includes:

- UN member states conventionally taught as European countries.
- Russia and Türkiye as transcontinental states.
- Armenia, Azerbaijan and Georgia as transcontinental South Caucasus states included in the app's Europe learning scope.
- Cyprus, which is geographically in the Eastern Mediterranean and politically associated with Europe.
- Vatican City / the Holy See.
- Kosovo as a separately documented, partially recognised learning item.

Kazakhstan is not in the Europe v1 deck. Although a small part of Kazakhstan lies west of the Ural River, the app treats it as an Asia learning item when Asia is added.

This is a learning-product convention, not a claim that every geographic or political classification system uses the same boundary.

## Capital convention

Use the commonly taught national capital unless a special case is documented in the dataset.

Current special cases:

- **Netherlands** — Amsterdam is used. The seat of government is The Hague.
- **Switzerland** — Bern is used for learning purposes. Formally it is the federal city rather than a constitutionally designated capital.
- **Vatican City** — Vatican City is used as both the country learning label and capital.

Alternative spellings can be stored in `capitalAliases` and later accepted by typing-mode answer normalisation. Examples include Reykjavík/Reykjavik, Chișinău/Chisinau and Kyiv/Kiev.

## Country names and aliases

The primary display label should use the current short-form country name chosen for the dataset. Familiar alternatives can be retained in `aliases` for search and typing-mode normalisation.

Examples:

- Czechia → alias `Czech Republic`
- Türkiye → alias `Turkey`
- United Kingdom → aliases `UK`, `Great Britain`

## Recognition status

Recognition is explicit data, not inferred from whether an item appears in a deck.

- `un-member` — UN member state.
- `un-observer` — UN non-member observer state.
- `partial` — partially recognised state included deliberately for learning purposes.

## Territories

Dependent territories are not included as country learning items in the Europe v1 deck. A future territories category can be added without changing the core quiz engine.
