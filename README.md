#colors.less

##Create color schemes with LESS

I like to use formulaic color schemes in my web development sometimes,
but generating them with tools like [kuler][] is not very maintainable.
So I decided to write some LESS color formulas to generate some of the
most common color schemes for me, and share it with you.

##Documentation

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
only take `@baseColor`.

### Dependancies

The only dependancy is [LESS][].

  [kuler]: https://kuler.adobe.com/
  [LESS]: http://lesscss.org/
