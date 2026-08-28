# Linkstr

Linkstr is a "link in bio" page builder — like Linktree — except it doesn't run on a server you have to trust. It's built on **Nostr**, a decentralized protocol, so your link collection lives on the open network instead of one company's database.

## How Nostr works (in plain terms)

Think about how the normal internet usually works: you sign up for a service (say, Linktree), and your data (your links, bio, etc.) lives on *their* servers. If they shut down, change their rules, ban you, or get hacked, your data and your page go with them. You're trusting one company.

Nostr flips that around:

- **You have a keypair, not an account.** Instead of a username/password, you generate a private key (your identity, keep it secret) and a public key (your username, safe to share — often shown as an `npub...` string). Nobody "issues" it to you; you just generate it.
- **You sign your own data.** When you post something, your app cryptographically signs it with your private key. Anyone can verify it really came from you, without needing to trust a company's login system.
- **"Relays" store and forward everything.** A relay is just a simple server that stores signed messages ("events") and passes them along to whoever asks. There's no single central relay — anyone can run one, and the same message can be copied across many of them.
- **No single point of failure.** Because your signed data can sit on many relays at once, no single relay going down (or banning you) deletes your data or identity. Your identity (your keypair) isn't tied to any platform — you can take it anywhere.

It's a bit like email: anyone can run a mail server, and your address isn't locked to one provider — except with Nostr, every message is signed and verifiable, and there's no central authority at all.

## How Linkstr works

Linkstr lets you build a simple page of links (a title, description, and a list of link "nodes") and publish it as a signed Nostr event instead of saving it to a database:

1. **Build** — Add a title, description, and links using the collection builder UI.
2. **Publish** — When you hit publish, Linkstr packages your collection and signs/sends it to Nostr relays (via the `formstr` SDK).
3. **Share** — You get back a URL containing your public key (`npub`), e.g. `linkstr.app/#/npub1...`. Anyone who opens that link fetches your collection straight from the Nostr network and renders it — no Linkstr server required to serve your page.

## Why this is different from the normal internet

| Normal link-in-bio tool | Linkstr (on Nostr) |
|---|---|
| Data lives on the company's server | Data lives on public relays, replicated wherever you publish it |
| Your account can be banned or deleted by the platform | Your identity is just a keypair you own — no one can take it away |
| Company can shut down and your page disappears | As long as any relay still has your event, your page still works |
| You log in with a username/password the company controls | You "log in" by proving you own a private key — no central login server |

In short: normal apps make *the company* the source of truth for your data. Linkstr (and Nostr apps generally) make *your keypair and signature* the source of truth — the app is just a window into data that lives independently on the network.
