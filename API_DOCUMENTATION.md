# API Documentation

This document outlines the API endpoints for the tournament system.

## Organizer Functions

### 1. Create a Tournament

-   **Endpoint:** `POST /organizer/tournaments`
-   **Description:** Creates a new tournament with the specified details, automatically generating teams and round-robin matches.
-   **Request Body (JSON):**
    ```json
    {
      "name": "string",
      "number_of_teams": "number",
      "venue": "string",
      "kind_of_match": "string"
    }
    ```
-   **Responses:**
    -   `201 Created`: Successfully created tournament.
    -   `400 Bad Request`: Invalid input (e.g., missing fields, invalid number of teams).

### 2. Get Tournament Matches

-   **Endpoint:** `GET /organizer/matches/:tournamentId`
-   **Description:** Retrieves all matches for a specific tournament.
-   **Parameters:**
    -   `tournamentId` (path): The unique ID of the tournament.
-   **Responses:**
    -   `200 OK`: Returns an array of match objects.
    -   `404 Not Found`: Tournament not found.

### 3. Update Match Score

-   **Endpoint:** `PATCH /organizer/match/:matchId/score`
-   **Description:** Updates the scores and declares a winner for a specific match.
-   **Parameters:**
    -   `matchId` (path): The unique ID of the match.
-   **Request Body (JSON):**
    ```json
    {
      "score1": "number",
      "score2": "number",
      "winner": "string"
    }
    ```
-   **Responses:**
    -   `200 OK`: Successfully updated match.
    -   `400 Bad Request`: Invalid input (e.g., missing scores/winner, non-negative scores).
    -   `404 Not Found`: Match not found.

## User Functions

### 1. Get All Tournaments

-   **Endpoint:** `GET /user/tournaments`
-   **Description:** Retrieves a list of all available tournaments.
-   **Responses:**
    -   `200 OK`: Returns an array of tournament objects.
    -   `500 Internal Server Error`: Server error.

### 2. Get Tournament Matches

-   **Endpoint:** `GET /user/matches/:tournamentId`
-   **Description:** Retrieves all matches for a specific tournament.
-   **Parameters:**
    -   `tournamentId` (path): The unique ID of the tournament.
-   **Responses:**
    -   `200 OK`: Returns an array of match objects.
    -   `404 Not Found`: Tournament not found.

### 3. Get Match Details

-   **Endpoint:** `GET /user/match/:matchId`
-   **Description:** Retrieves detailed information for a specific match.
-   **Parameters:**
    -   `matchId` (path): The unique ID of the match.
-   **Responses:**
    -   `200 OK`: Returns a single match object.
    -   `404 Not Found`: Match not found.
