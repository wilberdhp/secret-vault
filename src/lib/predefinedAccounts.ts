import NetflixIcon from '../assets/iconos/netflix-icon.svg'
import FacebookIcon from '../assets/iconos/facebook-icon.svg'
import InstagramIcon from '../assets/iconos/instagram-icon.svg'
import GoogleIcon from '../assets/iconos/google.svg'
import WhatsAppIcon from '../assets/iconos/whatsapp-icon.svg'
import MicrosoftIcon from '../assets/iconos/microsoft.svg'
import LinkedInIcon from '../assets/iconos/linkedin.svg'
import YouTubeIcon from '../assets/iconos/youtube.svg'
import GmailIcon from '../assets/iconos/gmail.svg'
import DropboxIcon from '../assets/iconos/dropbox.svg'
import SpotifyIcon from '../assets/iconos/spotify.svg'
import PinterestIcon from '../assets/iconos/pinterest.svg'
import RedditIcon from '../assets/iconos/reddit.svg'
import SnapchatIcon from '../assets/iconos/snapchat.svg'
import DiscordIcon from '../assets/iconos/discord.svg'
import ZoomIcon from '../assets/iconos/zoom.svg'
import AppleDark from '../assets/iconos/Apple_dark.svg'
import AppleLight from '../assets/iconos/Apple_light.svg'
import XDark from '../assets/iconos/X_dark.svg'
import XLight from '../assets/iconos/X_light.svg'
import AmazonDark from '../assets/iconos/amazon_dark.svg'
import AmazonLight from '../assets/iconos/amazon_light.svg'
import TikTokDark from '../assets/iconos/TikTok_dark.svg'
import TikTokLight from '../assets/iconos/TikTok_light.svg'


// export const predefinedAccounts = [
//   { name: 'Netflix', logo: NetflixIcon },
//   { name: 'Facebook', logo: FacebookIcon },
//   { name: 'Instagram', logo: InstagramIcon },
//   { name: 'Google', logo: GoogleIcon },
//   { name: 'WhatsApp', logo: WhatsAppIcon },
//   { name: 'Microsoft', logo: MicrosoftIcon },
//   { name: 'LinkedIn', logo: LinkedInIcon },
//   { name: 'YouTube', logo: YouTubeIcon },
//   { name: 'Gmail', logo: GmailIcon },
//   { name: 'Dropbox', logo: DropboxIcon },
//   { name: 'Spotify', logo: SpotifyIcon },
//   { name: 'Pinterest', logo: PinterestIcon },
//   { name: 'Reddit', logo: RedditIcon },
//   { name: 'Snapchat', logo: SnapchatIcon },
//   { name: 'Discord', logo: DiscordIcon },
//   { name: 'Zoom', logo: ZoomIcon },
//   { name: 'Apple', logo: 'https://placehold.co/40x40/000000/ffffff?text=A' },
//   { name: 'Twitter', logo: 'https://placehold.co/40x40/1da1f2/ffffff?text=X' },
//   { name: 'Amazon', logo: 'https://placehold.co/40x40/ff9900/ffffff?text=A' },
//   { name: 'TikTok', logo: 'https://placehold.co/40x40/000000/ffffff?text=T' }
// ];

export const predefinedAccounts = {
  Netflix: NetflixIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Google: GoogleIcon,
  WhatsApp: WhatsAppIcon,
  Microsoft: MicrosoftIcon,
  LinkedIn: LinkedInIcon,
  YouTube: YouTubeIcon,
  Gmail: GmailIcon,
  Dropbox: DropboxIcon,
  Spotify: SpotifyIcon,
  Pinterest: PinterestIcon,
  Reddit: RedditIcon,
  Snapchat: SnapchatIcon,
  Discord: DiscordIcon,
  Zoom: ZoomIcon
} as const;

export function getPredefinedAccounts(theme: "light" | "dark") {
  const predefinedAccounts = {
    Netflix: NetflixIcon,
    Facebook: FacebookIcon,
    Instagram: InstagramIcon,
    Google: GoogleIcon,
    WhatsApp: WhatsAppIcon,
    Microsoft: MicrosoftIcon,
    LinkedIn: LinkedInIcon,
    YouTube: YouTubeIcon,
    Gmail: GmailIcon,
    Dropbox: DropboxIcon,
    Spotify: SpotifyIcon,
    Pinterest: PinterestIcon,
    Reddit: RedditIcon,
    Snapchat: SnapchatIcon,
    Discord: DiscordIcon,
    Zoom: ZoomIcon,
    Apple: theme === "dark" ? AppleDark : AppleLight,
    X: theme === "dark" ? XDark : XLight,
    Amazon: theme === "dark" ? AmazonDark : AmazonLight,
    TikTok: theme === "dark" ? TikTokDark : TikTokLight
  } as const;
  
  return predefinedAccounts
}

type PredefinedAccounts = ReturnType<typeof getPredefinedAccounts>;
export type PredefinedAccountKey = keyof PredefinedAccounts;