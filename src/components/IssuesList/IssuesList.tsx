import React, { FC } from 'react';
import { gql, useQuery } from '@apollo/client';

import { IssueLink } from '../IssueLink/IssueLink';
import { ISSUE_FRAGMENT } from '../../pages/issue';
import { Query as GithubQuery, IssueState } from '../../generated/github';

export const GET_ISSUES = (state: IssueState) => gql`
  query GET_ISSUES($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      issues(last: 20, states: ${state}) {
        edges {
          node {
            ...ISSUE_FRAGMENT
          }
        }
      }
    }
  }
  ${ISSUE_FRAGMENT}
`;

type IssuesVars = {
  owner: string;
  name: string;
  query: string;
};

type IssuesListProps = {
  searchText: string;
  state?: IssueState;
};

export const IssuesList: FC<IssuesListProps> = ({
  searchText,
  state = IssueState.Open,
}) => {
  const { loading, error, data } = useQuery<GithubQuery, IssuesVars>(
    GET_ISSUES(state),
    {
      variables: {
        owner: 'facebook',
        name: 'react',
        query: searchText,
      },
    },
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (!data) return <p>No issues found.</p>;

  return (
    <div className="flex flex-col justify-center max-w-4xl mx-auto p-10">
      {data?.repository?.issues.edges?.map(
        (edge) =>
          edge?.node && (
            <IssueLink
              key={edge.node.id}
              title={edge.node.title}
              number={edge.node.number}
            />
          ),
      )}
    </div>
  );
};
