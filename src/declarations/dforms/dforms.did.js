export const idlFactory = ({ IDL }) => {
  const Domain = IDL.Text;
  const NewsSource = IDL.Record({
    'domain' : IDL.Text,
    'source' : IDL.Text,
    'bias' : IDL.Text,
    'accuracy' : IDL.Text,
  });
  return IDL.Service({
    'getNewsSources' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(Domain, NewsSource))],
        ['query'],
      ),
    'insert' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        ['query'],
      ),
    'lookup' : IDL.Func([IDL.Text], [IDL.Opt(NewsSource)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
