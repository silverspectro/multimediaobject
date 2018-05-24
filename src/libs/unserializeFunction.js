export default (serialized) => {
let args = serialized.args.map(el => el.replace(/\n+|(\/\*\*\/\n)+/g, '').replace(/(\/\*``\*\/)+/g, '').replace(/^(\n+|\t+|\t\n+)(?!\w)$/gm, '').replace(/`/gm, ''));
  const body = serialized.body;
  let func = new Function();
  try {
    func = new Function(args, body);
  } catch(e) {
    console.error(e);
  }
  return func
}