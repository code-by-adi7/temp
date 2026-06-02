export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  duration: string;
  views: string;
  thumbnail: string;
}

export const videos: Video[] = [
  {
    id: "1",
    youtubeId: "LXb3EKWsInQ",
    title: "A Day in God's Own Country",
    category: "Travel Vlog",
    duration: "12:34",
    views: "48K",
    thumbnail: "https://img.youtube.com/vi/LXb3EKWsInQ/maxresdefault.jpg",
  },
  {
    id: "2",
    youtubeId: "KVu3gS7iJH4",
    title: "Monsoon Road Trip Diaries",
    category: "Road Trip",
    duration: "18:22",
    views: "112K",
    thumbnail: "https://img.youtube.com/vi/KVu3gS7iJH4/maxresdefault.jpg",
  },
  {
    id: "3",
    youtubeId: "oHg5SJYRHA0",
    title: "Street Food Chronicles — Kochi Edition",
    category: "Food & Culture",
    duration: "9:47",
    views: "67K",
    thumbnail: "https://img.youtube.com/vi/oHg5SJYRHA0/maxresdefault.jpg",
  },
  {
    id: "4",
    youtubeId: "ZZ5LpwO-An4",
    title: "Living Slow in Wayanad",
    category: "Lifestyle",
    duration: "22:10",
    views: "93K",
    thumbnail: "https://img.youtube.com/vi/ZZ5LpwO-An4/maxresdefault.jpg",
  },
  {
    id: "5",
    youtubeId: "7wtfhZwyrcc",
    title: "Munnar — Above the Clouds",
    category: "Travel Vlog",
    duration: "15:58",
    views: "204K",
    thumbnail: "https://img.youtube.com/vi/7wtfhZwyrcc/maxresdefault.jpg",
  },
  {
    id: "6",
    youtubeId: "M7lc1UVf-VE",
    title: "My Camera Gear for Vlogging 2024",
    category: "Behind the Lens",
    duration: "11:03",
    views: "55K",
    thumbnail: "https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg",
  },
];
