# colors.less

## Create color schemes with LESS

I like to use formulaic color schemes in my web development sometimes,
but generating them with tools like [kuler][] is not very maintainable.
So I decided to write some LESS color formulas to generate some of the
most common color schemes, and share it with you.

## Documentation

### Scope:

Create the following color schemes

* Shades
* Analgous
* Complementary
* Split Complementary
* Clash
* Triadic
* Tetradic
* Five tone
* Six tone

### Usage

Each color scheme takes two parameters, `@baseColor` and `@difference`,
`@distance`, or `@angle`. Except for the complimentary scheme, which
only takes `@baseColor`.

### Dependancies

The only dependancy is [LESS][].

### [Demo][]

  [kuler]: https://kuler.adobe.com/
  [LESS]: http://lesscss.org/
  [Demo]: http://projects.jamieking.me/colors.less/#demo
