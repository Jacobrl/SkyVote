# Sources

Every website used for SkyVote. Cards in this folder cite these IDs.
All pages were read on 2026-11-20.

| ID | Title | Publisher | URL |
|---|---|---|---|
| `usno` | Phases of the Moon (data API) | US Naval Observatory | https://aa.usno.navy.mil/data/MoonPhases |
| `britannica` | Lunar phase | Encyclopaedia Britannica | https://www.britannica.com/science/lunar-phases |
| `nasa` | Moon Phases | NASA Science | https://science.nasa.gov/moon/moon-phases/ |
| `lpi` | Sky Tellers: Moon Phases | Lunar and Planetary Institute (USRA) | https://www.lpi.usra.edu/education/skytellers/moon-phases/ |
| `catalina` | Moon Phases | Catalina Sky Survey, University of Arizona | https://catalina.lpl.arizona.edu/moon-phases |
| `planetary` | The phases of the Moon explained | The Planetary Society | https://www.planetary.org/articles/the-phases-of-the-moon-explained |
| `earthsky` | How to understand moon phases: 4 tips! | EarthSky | https://earthsky.org/moon-phases/understandingmoonphases/ |
| `moongiant` | Today's Moon Phase | MoonGiant | https://www.moongiant.com/phase/today/ |
| `khan` | Phases of the moon (video) | Khan Academy | https://www.khanacademy.org/science/middle-school-earth-and-space-science/x87d03b443efbea0a:the-earth-sun-moon-system/x87d03b443efbea0a:the-moon-and-its-motions/v/phases-of-the-moon |

## Notes on each source

- **`usno`**: Exact UTC times of the main phases for late October to mid
  December 2026, read from the API at
  `https://aa.usno.navy.mil/api/moon/phases/date?date=2026-10-20&nump=8`.
  These times are in `js/calendar.js`. The API response does not state a
  time zone, but the "Time Format" note on the USNO Moon Phases page says
  its times are in Universal Time (UTC). Confirmed 2026-11-20.
- **`britannica`**: Short article by the Britannica editors, last revised
  by Erik Gregersen (2026-11-09). Used for the eight phases, the
  Sun-Earth-Moon positions and roughly how much of the Moon is lit. Also
  the basis for the calendar's hover tooltips.
- **`nasa`**: Used for the day and night sides, each phase, rise and set
  times, earthshine, libration, distance and orbit length.
- **`lpi`**: Used for why phases happen, the hemisphere difference, the
  sidereal and synodic months, eclipses and the "dark side" myth.
  **Left out:** its counts of other planets' moons (for example "61"
  for Jupiter) are out of date.
- **`catalina`**: A phase-of-the-day widget whose text comes from
  EarthSky. Used only for waxing gibbous facts. **Left out:** its
  countdowns and illumination figure only applied on the day it was read.
- **`planetary`**: Article by Kate Howells (2023-04-25). Used for each
  phase, why crescents look curved, why "quarter" is used, and eclipse
  frequency.
- **`earthsky`**: Article by Deborah Byrd (2026-10-25). Used for rising
  and setting directions, the Moon's daily eastward motion and later
  moonrises.
- **`moongiant`**: Used for the major and minor phases, 29.53-day cycle
  and the meaning of "gibbous". **Left out:** its "zodiac moon sign" section
  (astrology), and its illumination numbers and "Moon age" for that day.
- **`khan`**: Video transcript. Used for "half of a half" quarter phases,
  waxing and waning meanings, earthshine and the Moon's effect on tides
  and Earth's tilt. **Left out:** viewer comments below the video, which
  are not reviewed.
