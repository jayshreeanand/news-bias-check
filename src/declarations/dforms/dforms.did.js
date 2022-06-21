export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const Domain = IDL.Text;
  const NewsSource = IDL.Record({
    'domain' : IDL.Text,
    'source' : IDL.Text,
    'bias' : IDL.Text,
    'accuracy' : IDL.Text,
  });
  List.fill(IDL.Opt(IDL.Tuple(IDL.Tuple(Domain, NewsSource), List)));
  const Name = IDL.Text;
  const Phone = IDL.Text;
  const Entry = IDL.Record({ 'desc' : IDL.Text, 'phone' : Phone });
  return IDL.Service({
    'getNewsSources' : IDL.Func([], [List], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'insert' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [], []),
    'insertOld' : IDL.Func([Name, Entry], [], []),
    'lookup' : IDL.Func([IDL.Text], [IDL.Opt(NewsSource)], ['query']),
    'lookupOld' : IDL.Func([Name], [IDL.Opt(Entry)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
