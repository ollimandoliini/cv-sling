# CV Sling

A simple CLI for generating a CV in PDF format based on a profile file supplied as a JSON file.

## Usage

```sh
npm install
npm start \
    --profile <Path to profile json file> \
    --pic <Path to a profile picture file [optional]> \
    --output <PDF output path [optional]>
```

## Profile

An example of a profile JSON.

```json
{
  "name": "Pelle Hermanni",
  "description": "Pelle Hermanni is a fictional character who appeared in a popular Finnish children's television series called Pikku-Kakkonen. He was a circus clown who entertained children with his funny antics and silly jokes",
  "links": [
    {
      "text": "LinkedIn",
      "url": "https://www.linkedin.com/in/pelle-hermanni"
    }
  ],
  "experience": [
    {
      "title": "Actor",
      "company": "Yle",
      "from": "Aug 1978",
      "to": "Apr 1988",
      "techs": ["Naurukone"],
      "description": "Worked as a circus clown for a popular children's TV series."
    }
  ],
  "other": [
    {
      "heading": "Education",
      "entries": [
        "Clown Academy",
      ]
    },
    {
      "heading": "Language skills",
      "entries": ["Finnish - native"]
    }
  ]
}
```
