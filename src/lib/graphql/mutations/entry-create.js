export const mutationEntryCreate = `
  mutation ($titleEsu: String!, $entryEsu: String!) {
    entryCreate(entryInput: {
      titleEsu: $titleEsu,
      entryEsu: $entryEsu}) {
    id
    titleEsu
    entryEsu
    }
  }
`
