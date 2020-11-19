import { InMemoryCache } from '@apollo/client';
import { IssueConnection } from '../generated/github';

export const cache = new InMemoryCache({
  typePolicies: {
    Repository: {
      fields: {
        issues: {
          read: (issueRefs: IssueConnection, option) => {
            if (!option.variables?.query) {
              return issueRefs;
            }

            const filteredIssues = issueRefs?.edges?.filter((edgeRef) => {
              const title = option.readField('title', {
                ...edgeRef?.node,
              }) as String;
              const bodyText = option.readField('bodyText', {
                ...edgeRef?.node,
              }) as String;

              const isMatch =
                title.toLowerCase().includes(option.variables?.query) ||
                bodyText.toLowerCase().includes(option.variables?.query);
              return isMatch;
            });

            return { __typename: issueRefs.__typename, edges: filteredIssues };
          },
        },
      },
    },
  },
});
