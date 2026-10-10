
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "Soundwave Music Festival",
    category: "Music",
    date: "OCT 24, 2026",
    location: "City Arena",
    price: "₹799",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=85",
    tag: "POPULAR",
  },
  {
    id: 2,
    title: "FutureTech Summit",
    category: "Technology",
    date: "NOV 02, 2026",
    location: "Innovation Hub",
    price: "₹499",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85",
    tag: "TRENDING",
  },
  {
    id: 3,
    title: "Creative Minds Workshop",
    category: "Arts",
    date: "NOV 08, 2026",
    location: "The Creative Studio",
    price: "₹299",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",
    tag: "NEW",
  },
  {
    id: 4,
    title: "Business Connect 2026",
    category: "Business",
    date: "NOV 14, 2026",
    location: "Grand Convention Hall",
    price: "₹599",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85",
    tag: "FEATURED",
  },
  {
    id: 5,
    title: "Sunset Outdoor Festival",
    category: "Music",
    date: "NOV 21, 2026",
    location: "Riverside Park",
    price: "₹399",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85",
    tag: "POPULAR",
  },
  {
    id: 6,
    title: "Startup Ideas Meetup",
    category: "Business",
    date: "NOV 28, 2026",
    location: "Innovation Hub",
    price: "₹199",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85",
    tag: "NEW",
  },
];

const categories = [
  "All Events",
  "Music",
  "Technology",
  "Business",
  "Arts",
];

function Hero({ search, setSearch, location, setLocation }) {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-badge">
          <span>✦</span> YOUR NEXT GREAT EXPERIENCE
        </div>

        <h1>
          Find events worth
          <br />
          <span>remembering.</span>
        </h1>

        <p className="hero-description">
          Discover amazing experiences, connect with your
          community, and make every moment count.
        </p>

        <form
          className="search-bar"
          onSubmit={(e) => {
            e.preventDefault();
            document
              .getElementById("events")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="search-icon">⌕</span>

          <input
            type="search"
            placeholder="Search events, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search events"
          />

          <span className="search-divider"></span>

          <span className="location-icon">⌖</span>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Filter by location"
          >
            <option value="All Locations">Any location</option>
            <option value="City Arena">City Arena</option>
            <option value="Innovation Hub">Innovation Hub</option>
            <option value="The Creative Studio">
              Creative Studio
            </option>
            <option value="Grand Convention Hall">
              Convention Hall
            </option>
            <option value="Riverside Park">Riverside Park</option>
          </select>

          <button type="submit" className="search-button">
            Search Events
          </button>
        </form>

        <div className="hero-stats">
          <div>
            <strong>500+</strong>
            <span>Events to explore</span>
          </div>
          <div className="stats-divider"></div>
          <div>
            <strong>10k+</strong>
            <span>Happy attendees</span>
          </div>
          <div className="stats-divider"></div>
          <div>
            <strong>50+</strong>
            <span>Event organizers</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-image-main">
          <img
            src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85"
            alt="Live music festival with an excited crowd"
          />
          <div className="image-overlay">
            <span>✦ LIVE EXPERIENCES</span>
            <h3>Make it a moment.</h3>
          </div>
        </div>

        <div className="floating-card">
          <div className="floating-icon">🎟️</div>
          <div>
            <strong>Your next adventure</strong>
            <p>Starts right here</p>
          </div>
          <span className="floating-check">✓</span>
        </div>

        <div className="hero-decoration decoration-one"></div>
        <div className="hero-decoration decoration-two"></div>
      </div>
    </section>
  );
}

function EventCard({ event }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="event-card">
      <div className="event-image">
        <img src={event.image} alt={event.title} loading="lazy" />

        <span className="event-tag">{event.tag}</span>

        <button
          className={`save-button ${saved ? "saved" : ""}`}
          onClick={() => setSaved(!saved)}
          aria-label={saved ? "Remove bookmark" : "Save event"}
          aria-pressed={saved}
          type="button"
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="event-info">
        <span className="event-category">{event.category}</span>

        <h3>{event.title}</h3>

        <div className="event-detail">
          <span>▦</span> {event.date}
        </div>

        <div className="event-detail">
          <span>⌖</span> {event.location}
        </div>

        <div className="event-card-bottom">
          <div className="event-price">
            <span>Starting from</span>
            <strong>{event.price}</strong>
          </div>

          <button
            className="details-button"
            onClick={() =>
              alert(
                `${event.title}\n${event.date}\n${event.location}\nStarting from ${event.price}`
              )
            }
            type="button"
          >
            View Details ↗
          </button>
        </div>
      </div>
    </article>
  );
}

function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [category, setCategory] = useState("All Events");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = `${event.title} ${event.category} ${event.location}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All Events" || event.category === category;

    const matchesLocation =
      location === "All Locations" || event.location === location;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <>
      <Hero
        search={search}
        setSearch={setSearch}
        location={location}
        setLocation={setLocation}
      />

      <section className="events-section" id="events">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">HANDPICKED FOR YOU</span>
            <h2>Trending Events <span>✦</span></h2>
            <p>Discover experiences you won't want to miss.</p>
          </div>

          <span className="event-count">
            {filteredEvents.length} events found
          </span>
        </div>

        <div className="category-filters" id="categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`category-button ${
                category === item ? "selected" : ""
              }`}
              onClick={() => setCategory(item)}
            >
              {item === "All Events" && "✦ "}
              {item === "Music" && "♫ "}
              {item === "Technology" && "⌘ "}
              {item === "Business" && "◈ "}
              {item === "Arts" && "✎ "}
              {item}
            </button>
          ))}
        </div>

        {filteredEvents.length > 0 ? (
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>🔎</span>
            <h3>No events found</h3>
            <p>Try another search or choose a different category.</p>
            <button
              className="search-button"
              onClick={() => {
                setSearch("");
                setCategory("All Events");
                setLocation("All Locations");
              }}
              type="button"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <section className="organizer-banner">
        <div>
          <span>HAVE AN IDEA?</span>
          <h2>Make your event unforgettable.</h2>
          <p>
            Bring people together. Your next great event starts
            with a plan.
          </p>
        </div>

        <a href="#home" className="organizer-button">
          Become an Organizer ↗
        </a>
      </section>
    </>
  );
}

export default Home;
