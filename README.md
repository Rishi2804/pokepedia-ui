# PokePedia (Web UI)
Dive into the ultimate Pokémon encyclopedia! PokePedia is your one-stop resource for everything you need to know about 
the iconic Pokémon universe. Whether you're a casual trainer or a seasoned Pokémon Master, PokePedia has it all 
— from detailed profiles of all 1025 Pokémon and their various forms, to 
in-depth information on 919 unique moves and 307 abilities.

With the most up-to-date data from *Pokémon Scarlet and Violet* and all previous titles, 
PokePedia is here to guide you through every aspect of the Pokémon world. 
Ready to uncover hidden stats, move strategies, and more? Your adventure starts here!

## Technologies 💻
- React (Base)
- Material-UI (Styling)
- Zustand (State Management)
- dnd-kit (drag and drop toolkit)
- Used in tandem with custom [backend SpringBoot API](https://github.com/Rishi2804/PokePedia-api)

## Features 
Below we have snapshots into all the features this website offers with visuals

### Pokédex
Each game has a different Pokédex (list of species available in the base game), so naturally 
the first thing to do would be to select a game first. \
The top option is just a list of all Pokémon that have ever been introduced



We are then lead to a list of all the relevant Pokémon and its forms that appear in the selected game.
From here you can search, for filter for a Pokémon as you desire with the given options


Clicking on a specific Pokémon allows you to have a better look at the species, with information including:
- Biometrics
- Stats (Attack, Defense, Speed, etc)
- Type Relations (Weaknesses and Strengths)
- Abilities
- Evolutions
- Pokédex Entries (Descriptions)
- Learnsets (Learnable moves)

### Moves
All moves are listed as such in a grid view with the ability to search and filter as desired

Once a specific move is clicked, you can see more details about it including:
- Basic Info (Type, Class, Power, Accuracy, etc)
- Effect (What the move does)
- Descriptions
- List of Pokémon that can learn the move at some point

### Abilities
Similar to Moves, all abilites are listed in a similar fashion as well as the ability to search. Clicking on an ability shows more info

### Types
The Pokémon Type Chart can be very complex! This page makes it easier to view how a type combo matches up with the rest of the 18 Pokémon types

### Team Builder
In the games, you are allowed to only keep a team of 6 Pokémon on you at all times. Building a balanced team with minimal
and uniformly distributed weaknesses can be challenging. This feature aids you in that, allowing you to pick from a list of pokemon available in the chosen game.
User teams save to browser history and show on the landing page.

### Video Walkthrough 🎥 
Wanna have a deeper look at the website? Check out the walkthrough (2025/01/07): \
[PokePedia Web Walkthrough](https://www.youtube.com)
