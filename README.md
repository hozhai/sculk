<p align="center">
  <img src="./assets/sculk_banner.png">
</p>

---

> [!WARNING]
> This project is still under heavy development and largely unfinished. Please report any bugs in the Discord (link WIP)!

## What is Sculk?

Sculk is a highly customizable Hypixel guild bot that not only provides a bridge to communicate from Discord to the in-game guild chat and viceversa, it also **aims** to provide guild EXP tracking, and much more!


## Features

Sculk's current features are as follows:

* Customizable branding
  * Change the color of the bot's Discord embeds, and even the name; make Sculk completely yours with no trace of *sculk* behind
* Discord <-> Guild chat (/gc) bridge
  * Customizable separator
  * Customizable prefix
  * Customizable webhook name
  * Option to replace `discord` with `disc0rd` to prevent that annoying message from popping up for everyone
  * Option to replace URLs sent from the Discord with `[link]` in-game.
  * Option to replace attachments sent from the Discord with `[attachment(s)]` in-game.
* Guild join, leave, and kick messages
  * Option to embed a [SkyCrypt](https://sky.shiiyu.moe) link into usernames when joining/leaving the server
  * Option to anonymize the kicker
  * Ability to choose which channel these messages are sent to

## Planned Features

Sculk is not finished! Here are some of the things Sculk aims to implement in the future (keep in mind that this list may be changed or modified at any time):

* Discord <-> Officer chat (/oc) bridge
  * Option to enable/disable this functionality
* Event reminders
  * Sends a reminder for events such as the Dark Auction, 
* Guild commands
  * These are prefix commands that can be executed from both the in-game chat and the Discord channel.
    * Customizable prefix (default `s!`)
    * Option to disable commands of your choosing
    * Option to add your own aliases to commands of your choosing
  * `s!nw <player>` - shows a player's networth given their username
    * `<player>` argument is optional if sent from the in-game chat
  * `s!cata <player>` - shows a player's Catacombs level along with their class levels
    * `<player>` argument is optional if sent from the in-game chat
  * `s!lvl <player>` - shows a player's Skyblock level
    * `<player>` argument is optional if sent from the in-game chat
  * `s!8ball` - your average 8ball command
  * `s!dice [number]` - rolls an n-sided dice (defaults to n = 6)

Feel free to suggest more features in the Discord (link WIP)!

## Contributing

Contributions are always welcome! Fork the repository, make sure the commits follow the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) specification, and make a pull request! I'll try to get to it ASAP.

## Support

Here's the Discord server (link WIP) you can join for support, bug reports, and suggestions!

Sculk is a personal project with no monetary incentive. I use my own free time to work on this project, just because I like playing Hypixel. If you have the time and ability, please check out my Ko-fi!

## License

This project is licensed under the [MIT license](./LICENSE.md).
