export default ({
  "?name": new RegExp("^[a-zA-Z0-9\-_]{1,}$"),
  "?uuid": new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/, 'i'),
  "?data": Object,
  "?style": Object,
  "?attributes": Object,
  "?events": Object,
  "?functions": Object,
  "?animations": Object,
  "?dependencies": Object,
  "?breakpoints": Array,
});