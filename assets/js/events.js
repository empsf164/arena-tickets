/**
 * ARENA — Events & Fixtures Database & Filtering Engine
 * High-definition multi-sport fixtures with authentic venues, teams, pricing and availability
 */

const ARENA_EVENTS_DATA = [
  {
    id: 'ucl-final-2026',
    sport: 'Football',
    competition: 'UEFA Champions League Final',
    title: 'Real Madrid vs Manchester City',
    teams: {
      home: { name: 'Real Madrid', crest: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&q=80', code: 'RMA' },
      away: { name: 'Manchester City', crest: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=80&q=80', code: 'MCI' }
    },
    date: '2026-06-14',
    displayDate: 'Saturday, 14 June 2026',
    time: '20:00 BST',
    venue: 'Wembley Stadium',
    city: 'London, UK',
    capacity: 90000,
    priceFrom: 185,
    status: 'Selling Fast',
    badgeClass: 'badge-urgent',
    featured: true,
    spotlight: true,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    description: 'The pinnacle of European club football. Watch the two modern titans clash under the legendary arch of Wembley Stadium in an unforgettable night of sporting theatre.',
    categories: [
      { id: 'cat-ga', name: 'General Admission - Upper Tier', price: 185, available: 142, view: 'Elevated panoramic stadium view' },
      { id: 'cat-lower', name: 'Lower Tier - Corner', price: 290, available: 68, view: 'Intense pitchside energy & goal celebrations' },
      { id: 'cat-central', name: 'Category 1 - Central Sideline', price: 440, available: 34, view: 'Prime halfway line unobstructed sightlines' },
      { id: 'cat-vip', name: 'Bobby Moore Executive Club & Dining', price: 890, available: 12, view: 'VIP padded seats, 4-course banquet, legends lounge' }
    ]
  },
  {
    id: 't20-final-2026',
    sport: 'Cricket',
    competition: 'ICC T20 World Cup Final',
    title: 'India vs Australia',
    teams: {
      home: { name: 'India', crest: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=80&q=80', code: 'IND' },
      away: { name: 'Australia', crest: 'https://images.unsplash.com/photo-1531415074868-036b1c5d53ec?auto=format&fit=crop&w=80&q=80', code: 'AUS' }
    },
    date: '2026-07-05',
    displayDate: 'Sunday, 5 July 2026',
    time: '19:30 IST',
    venue: 'Narendra Modi Stadium',
    city: 'Ahmedabad, India',
    capacity: 132000,
    priceFrom: 75,
    status: 'Popular',
    badgeClass: 'badge-urgent',
    featured: true,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    description: 'Over 130,000 roaring spectators in the world’s largest cricket amphitheatre to crown the champions of the ICC T20 World Cup.',
    categories: [
      { id: 'cat-east', name: 'East Stand General', price: 75, available: 320, view: 'Expansive field view behind boundary' },
      { id: 'cat-club', name: 'Club Pavilion Tier 2', price: 140, available: 110, view: 'Straight long-on and long-off sightlines' },
      { id: 'cat-prem', name: 'Adani Premium Lower Box', price: 260, available: 45, view: 'Player dugout proximity with dining pass' },
      { id: 'cat-vip', name: 'President’s Suite VIP Lounge', price: 650, available: 10, view: 'Glass-fronted air-conditioned luxury hospitality' }
    ]
  },
  {
    id: 'nba-finals-2026',
    sport: 'Basketball',
    competition: 'NBA Finals — Championship Match',
    title: 'Boston Celtics vs Golden State Warriors',
    teams: {
      home: { name: 'Boston Celtics', crest: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=80&q=80', code: 'BOS' },
      away: { name: 'Golden State Warriors', crest: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=80&q=80', code: 'GSW' }
    },
    date: '2026-06-22',
    displayDate: 'Monday, 22 June 2026',
    time: '20:30 EDT',
    venue: 'TD Garden',
    city: 'Boston, USA',
    capacity: 19580,
    priceFrom: 310,
    status: 'Finals',
    badgeClass: 'badge-urgent',
    featured: true,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    description: 'Electric atmosphere on the iconic parquet floor as two storied franchises battle for the Larry O’Brien Championship Trophy.',
    categories: [
      { id: 'cat-balcony', name: 'Balcony 300 Level', price: 310, available: 48, view: 'Full court perspective and arena atmosphere' },
      { id: 'cat-loge', name: 'Loge Level Center Court', price: 620, available: 22, view: 'Lower bowl prime mid-court viewing' },
      { id: 'cat-courtside', name: 'Courtside Row 2 VIP', price: 1750, available: 6, view: 'Direct hardwood floor seating with lounge access' }
    ]
  },
  {
    id: 'wimbledon-final-2026',
    sport: 'Tennis',
    competition: 'The Championships Wimbledon',
    title: 'Men’s Singles Championship Final',
    teams: {
      home: { name: 'Carlos Alcaraz', crest: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=80&q=80', code: 'ESP' },
      away: { name: 'Novak Djokovic', crest: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=80&q=80', code: 'SRB' }
    },
    date: '2026-07-13',
    displayDate: 'Sunday, 13 July 2026',
    time: '14:00 BST',
    venue: 'Centre Court, All England Club',
    city: 'London, UK',
    capacity: 14979,
    priceFrom: 420,
    status: 'Grand Slam',
    badgeClass: 'badge-vip',
    featured: true,
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80',
    description: 'The world’s most prestigious tennis showcase on pristine Centre Court grass. Strawberries, cream, and timeless tennis supremacy.',
    categories: [
      { id: 'cat-upper-gang', name: 'Centre Court Upper Tier', price: 420, available: 25, view: 'Clear unobstructed grass court perspective' },
      { id: 'cat-court-tier', name: 'Debenture Side Tier', price: 980, available: 14, view: 'Mid-tier prime baselines and debenture lounge' },
      { id: 'cat-royal-tier', name: 'Royal Box Adjacent Club', price: 2200, available: 4, view: 'Exclusive enclosure with vintage Champagne dining' }
    ]
  },
  {
    id: 'monaco-gp-2026',
    sport: 'Formula Racing',
    competition: 'Formula 1 Grand Prix de Monaco',
    title: 'Monaco Grand Prix 2026 Race Day',
    teams: {
      home: { name: 'Scuderia Ferrari', crest: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=80&q=80', code: 'SF' },
      away: { name: 'Red Bull Racing', crest: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=80&q=80', code: 'RBR' }
    },
    date: '2026-05-24',
    displayDate: 'Sunday, 24 May 2026',
    time: '15:00 CEST',
    venue: 'Circuit de Monaco',
    city: 'Monte Carlo, Monaco',
    capacity: 37000,
    priceFrom: 480,
    status: 'High Demand',
    badgeClass: 'badge-urgent',
    featured: false,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    description: 'Speed, glamour, and precision around the famous Casino Square, Hairpin, and Harbour chicane on the French Riviera.',
    categories: [
      { id: 'cat-rocher', name: 'General Admission Le Rocher', price: 480, available: 40, view: 'Panoramic harbor and starting straight view' },
      { id: 'cat-grand-k', name: 'Grandstand K - Harbour Front', price: 850, available: 20, view: 'Prime view of Tabac and Swimming Pool chicanes' },
      { id: 'cat-paddock', name: 'F1 Paddock Club Yacht VIP', price: 3400, available: 8, view: 'Superyacht berth with pit lane walk and open bar' }
    ]
  },
  {
    id: 'six-nations-2026',
    sport: 'Rugby',
    competition: 'Guinness Six Nations Championship',
    title: 'England vs France (Le Crunch)',
    teams: {
      home: { name: 'England', crest: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=80&q=80', code: 'ENG' },
      away: { name: 'France', crest: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=80&q=80', code: 'FRA' }
    },
    date: '2026-06-10',
    displayDate: 'Wednesday, 10 June 2026',
    time: '16:45 BST',
    venue: 'Twickenham Stadium',
    city: 'London, UK',
    capacity: 82000,
    priceFrom: 110,
    status: 'Derby',
    badgeClass: 'badge-sport',
    featured: false,
    image: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=1200&q=80',
    description: 'The fiercest rugby rivalry in Europe. 82,000 passionate voices singing Swing Low at the Home of England Rugby.',
    categories: [
      { id: 'cat-upper-twic', name: 'Upper Stand Behind Posts', price: 110, available: 88, view: 'High angle tryline overview' },
      { id: 'cat-mid-twic', name: 'Middle Tier East Stand', price: 195, available: 42, view: 'Superb 22-metre sideline perspective' },
      { id: 'cat-rugby-vip', name: 'The Lock Hospitality Lounge', price: 490, available: 16, view: 'Guinness tap, rugby alumni talk, premium seat' }
    ]
  },
  {
    id: 'all-england-badminton',
    sport: 'Badminton',
    competition: 'YONEX All England Open',
    title: 'Men’s Singles Semifinals Showcase',
    teams: {
      home: { name: 'Viktor Axelsen', crest: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=80&q=80', code: 'DEN' },
      away: { name: 'Shi Yuqi', crest: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=80&q=80', code: 'CHN' }
    },
    date: '2026-07-02',
    displayDate: 'Thursday, 2 July 2026',
    time: '17:00 BST',
    venue: 'Utilita Arena Birmingham',
    city: 'Birmingham, UK',
    capacity: 15800,
    priceFrom: 45,
    status: 'Upcoming',
    badgeClass: 'badge-sport',
    featured: false,
    image: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=1200&q=80',
    description: 'Super-fast smashes and lightning reflexes in the oldest and most prestigious badminton tournament in the world.',
    categories: [
      { id: 'cat-bad-stand', name: 'Upper Tier Tier 2', price: 45, available: 95, view: 'Full court rally viewpoint' },
      { id: 'cat-bad-court', name: 'Court-Level Front Rows', price: 95, available: 30, view: 'Near net line thrilling angle' },
      { id: 'cat-bad-vip', name: 'All England VIP Club', price: 220, available: 12, view: 'Padded center seats & buffet dinner' }
    ]
  },
  {
    id: 'vnl-finals-2026',
    sport: 'Volleyball',
    competition: 'FIVB Volleyball Nations League Finals',
    title: 'Poland vs Italy Gold Medal Match',
    teams: {
      home: { name: 'Poland', crest: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=80&q=80', code: 'POL' },
      away: { name: 'Italy', crest: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=80&q=80', code: 'ITA' }
    },
    date: '2026-07-24',
    displayDate: 'Friday, 24 July 2026',
    time: '20:00 CEST',
    venue: 'Atlas Arena',
    city: 'Lodz, Poland',
    capacity: 13800,
    priceFrom: 55,
    status: 'Championship',
    badgeClass: 'badge-urgent',
    featured: false,
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
    description: 'Deafening cheers from Europe’s most dedicated volleyball fanbase as two world champions contest the VNL trophy.',
    categories: [
      { id: 'cat-vnl-ga', name: 'Sector C Upper Bowl', price: 55, available: 120, view: 'Arena overview behind server line' },
      { id: 'cat-vnl-lower', name: 'Sector A Courtside', price: 115, available: 38, view: 'Spike zone court-level excitement' },
      { id: 'cat-vnl-vip', name: 'Atlas Platinum Box', price: 280, available: 8, view: 'Private box with drinks and meet & greet' }
    ]
  },
  {
    id: 'el-clasico-2026',
    sport: 'Football',
    competition: 'La Liga EA Sports',
    title: 'FC Barcelona vs Real Madrid',
    teams: {
      home: { name: 'FC Barcelona', crest: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=80&q=80', code: 'BAR' },
      away: { name: 'Real Madrid', crest: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&q=80', code: 'RMA' }
    },
    date: '2026-06-20',
    displayDate: 'Saturday, 20 June 2026',
    time: '21:00 CEST',
    venue: 'Spotify Camp Nou',
    city: 'Barcelona, Spain',
    capacity: 105000,
    priceFrom: 165,
    status: 'Selling Fast',
    badgeClass: 'badge-urgent',
    featured: true,
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80',
    description: 'The newly renovated Camp Nou welcomes 105,000 spectators for the most watched club football match on the planet.',
    categories: [
      { id: 'cat-gol-nord', name: 'Gol Nord 2nd Tier', price: 165, available: 64, view: 'Behind the goal vibrant atmosphere' },
      { id: 'cat-lateral', name: 'Lateral 1st Tier', price: 295, available: 32, view: 'Prime sideline sightlines' },
      { id: 'cat-tribuna-vip', name: 'Tribuna Presidential Lounge', price: 750, available: 8, view: 'Director box hospitality & fine gastronomy' }
    ]
  }
];

window.ARENA_EVENTS = ARENA_EVENTS_DATA;

/**
 * Event Retrieval & Filtering Helpers
 */
window.ArenaEventsHelper = {
  getAll: () => ARENA_EVENTS_DATA,

  getById: (id) => {
    return ARENA_EVENTS_DATA.find((e) => e.id === id) || ARENA_EVENTS_DATA[0];
  },

  getFeatured: () => {
    return ARENA_EVENTS_DATA.filter((e) => e.featured);
  },

  getBySport: (sport) => {
    if (!sport || sport.toLowerCase() === 'all' || sport.toLowerCase() === 'all sports') {
      return ARENA_EVENTS_DATA;
    }
    return ARENA_EVENTS_DATA.filter((e) => e.sport.toLowerCase() === sport.toLowerCase());
  },

  search: ({ query = '', sport = '', venue = '', maxPrice = Infinity, sort = 'popular' }) => {
    let results = ARENA_EVENTS_DATA.filter((event) => {
      const matchQuery = !query ||
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.competition.toLowerCase().includes(query.toLowerCase()) ||
        event.teams.home.name.toLowerCase().includes(query.toLowerCase()) ||
        event.teams.away.name.toLowerCase().includes(query.toLowerCase());

      const matchSport = !sport || sport.toLowerCase() === 'all' ||
        event.sport.toLowerCase() === sport.toLowerCase();

      const matchVenue = !venue ||
        event.venue.toLowerCase().includes(venue.toLowerCase()) ||
        event.city.toLowerCase().includes(venue.toLowerCase());

      const matchPrice = event.priceFrom <= maxPrice;

      return matchQuery && matchSport && matchVenue && matchPrice;
    });

    if (sort === 'lowest') {
      results.sort((a, b) => a.priceFrom - b.priceFrom);
    } else if (sort === 'highest') {
      results.sort((a, b) => b.priceFrom - a.priceFrom);
    } else if (sort === 'date' || sort === 'upcoming') {
      results.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return results;
  }
};
