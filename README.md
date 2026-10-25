# InstaTrace
Privacy-First Instagram Unfollower Analyzer

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Privacy](https://img.shields.io/badge/100%25-Client--Side-orange?style=for-the-badge)

**InstaTrace** is a fast, 100% client-side web application built with React that allows you to find out who doesn't follow you back on Instagram using your official Instagram Data Export. 

Unlike third-party mobile apps that require your Instagram login credentials—putting your account at high risk of being shadowbanned or permanently suspended—InstaTrack processes your exported HTML files **locally in your browser**. No passwords, no APIs, and zero data ever leaves your device.

<br/>

## Features

- **100% Private & Client-Side:** All file parsing and data comparisons happen in your browser's memory using the native JavaScript `DOMParser`. Nothing is uploaded to any server.
- ** Paste `.html` file code or Individual File Upload:** paste your raw Instagram export `.html` file directly into the app, or upload `followers_1.html`, `following.html` and `pending_follow_requests.html` individually.
- **Comprehensive Relationship Tabs:**
  - **Not Following Back:** People you follow who don't follow you back.
  - **Pending Requests:** Private accounts that haven't accepted your follow request yet *(optional file)*.
  - **Mutuals:** Friends who follow you back.
  - **Fans:** People who follow you, but you don't follow back.
- **Search, Sort & Filter:** Quickly search through usernames or sort results alphabetically or by follow date/timestamp.
- **One-Click Profile Links:** Every username is linked directly to their live Instagram profile (`instagram.com/username`) so you can easily review and unfollow accounts in a new tab.
- **Export Results:** Download your "Not Following Back" list as a `.csv` or `.txt` file for your own records.

<br/>

## Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have **Node.js** (v16.0.0 or higher) and **npm** or **yarn** installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lynx7843/InstaTrace.git
   cd instatrack
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   Navigate to `http://localhost:5173` to use the application.

<br/>

## How to Export Your Instagram Data

To use this application, you need to request your follower and following files from Instagram. Make sure to request them in **HTML format**.

1. Open Instagram and go to your **Profile** -> **Menu (☰)** -> **Accounts Center**.
2. Navigate to **Your information and permissions** -> **Download your information**.
3. Click **Download or transfer information** and select your Instagram account.
4. Scroll down to the **Connections** section, and check **Followers and following**. Click **Next**.
5. Choose **Download to device**.
6. **Important Settings:**
   - **Date range:** `All time`
   - **Format:** `HTML` *(Make sure this is set to HTML, not JSON)*
7. Click **Create files**. Instagram will email you a link to download a `.zip` file within a few minutes.

<br/>

## How to Use InstaTrace

Once you have downloaded your `.zip` file from Instagram:
1. Extract the `.zip` file on your computer and open the `connections/followers_and_following/` folder.
2. Upload your files into the respective slots on the website:
   - **Followers (Required):** `followers_1.html` *(and `followers_2.html`, etc., if applicable)*
   - **Following (Required):** `following.html`
   - **Pending Requests (Optional):** `pending_follow_requests.html`
3. Click **Analyze Connections** to view your dashboard!

<br/>

## Tech Stack

- **Frontend Framework:** [React](https://react.dev/) (Hooks, Context API)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **HTML Parsing:** Native Browser `DOMParser` API

<br/>

## How It Works Under the Hood

Instagram's HTML export structures every connection inside a `<main>` container where each entry contains an anchor (`<a>`) tag with the user's profile URL and username, alongside a `<div>` containing the timestamp of the connection.

1. **File Reading:** Uses the HTML5 `FileReader` API to read file contents as text strings.
2. **DOM Parsing:** Instantiates `new DOMParser().parseFromString(htmlString, 'text/html')` to query `<main> a` tags and extract `{ username, profileUrl, timestamp }`.
3. **Set Comparison ($O(N)$ Time Complexity):**
   - Converts the Followers list into a JavaScript `Set` of usernames.
   - Filters the Following array against the Followers `Set` in $O(1)$ lookup time per user to instantaneously compute non-followers, even for accounts with $50,000+$ connections.
