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

### Video Walkthrough 🎥 
Wanna have a deeper look at the website? Check out the walkthrough (2025/01/07): \
[PokePedia Web Walkthrough](https://www.youtube.com)

### Pokédex
Each game has a different Pokédex (list of species available in the base game), so naturally 
the first thing to do would be to select a game first. \
The top option is just a list of all Pokémon that have ever been introduced

<img width="1511" alt="Pokedex Landing Page" src="https://github.com/user-attachments/assets/0e09e321-f72f-444f-8b62-72c2cf037db0" />

We are then lead to a list of all the relevant Pokémon and its forms that appear in the selected game.
From here you can search, for filter for a Pokémon as you desire with the given options

<img width="1511" alt="Game Landing Page" src="https://github.com/user-attachments/assets/c1d6f86e-a58a-4e0c-801a-2f9bbd5f0cc0" />

Clicking on a specific Pokémon allows you to have a better look at the species, with information including:
- Biometrics
- Stats (Attack, Defense, Speed, etc)
- Type Relations (Weaknesses and Strengths)
- Abilities
- Evolutions
- Pokédex Entries (Descriptions)
- Learnsets (Learnable moves

<img width="1511" alt="Pokemon Details Page" src="https://github.com/user-attachments/assets/ffb6d622-18e2-453c-be14-5665dc41622e" />

### Moves
All moves are listed as such in a grid view with the ability to search and filter as desired

<img width="1511" alt="Moves Landing Page" src="https://github.com/user-attachments/assets/b89c5296-3f9b-41c9-805f-cb8066879eba" />

Once a specific move is clicked, you can see more details about it including:
- Basic Info (Type, Class, Power, Accuracy, etc)
- Effect (What the move does)
- Descriptions
- List of Pokémon that can learn the move at some point

<img width="1511" alt="Moves Details Page" src="https://github.com/user-attachments/assets/f023192d-51c9-474b-8a0a-96e22af3bf90" />

### Abilities
Similar to Moves, all abilites are listed in a similar fashion as well as the ability to search. Clicking on an ability shows more info

<img width="1511" alt="Abilities Landing Page" src="https://github.com/user-attachments/assets/eb6e3d57-70eb-4dd2-ab94-46f5a391d6bd" />
<img width="1511" alt="Abilties Details Page" src="https://github.com/user-attachments/assets/c8e4357f-72ef-43a8-a27d-3d7f6ae41d6f" />

### Types
The Pokémon Type Chart can be very complex! This page makes it easier to view how a type combo matches up with the rest of the 18 Pokémon types

<img width="1511" alt="Types Details Page" src="https://github.com/user-attachments/assets/a588430f-ae9d-4718-9207-ce0eff49475e" />

### Team Builder
In the games, you are allowed to only keep a team of 6 Pokémon on you at all times. Building a balanced team with minimal
and uniformly distributed weaknesses can be challenging. This feature aids you in that, allowing you to pick from a list of pokemon available in the chosen game.
User teams save to browser history and show on the landing page.

<img width="1511" alt="Team Landing Page" src="https://github.com/user-attachments/assets/8987c3c1-e46c-4d0f-b11e-b7d75aee53a5" />

Once you select the game you want to build a team for, clicking on any Pokémon adds it to your team. \
From here you can give them moves, customize abilities, appearance and much more.

<img width="1511" alt="Team Creation Page" src="https://github.com/user-attachments/assets/900c4176-41ec-4b87-a510-6361e23d701b" />
