import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import { Query as GithubQuery } from '../generated/github';

export const ISSUE_FRAGMENT = gql`
  fragment ISSUE_FRAGMENT on Issue {
    id
    number
    title
    url
    bodyText
  }
`;

const GET_ISSUE = gql`
  query GET_ISSUE(
    $owner: String!
    $name: String!
    $number: Int!
    $count: Int!
  ) {
    repository(owner: $owner, name: $name) {
      id
      issue(number: $number) {
        ...ISSUE_FRAGMENT
        comments(last: $count) {
          edges {
            node {
              id
              bodyText
              author {
                login
                url
              }
            }
          }
        }
      }
    }
  }
  ${ISSUE_FRAGMENT}
`;

type IssueVars = {
  owner: string;
  name: string;
  number: number;
  count: number;
};

export const Issue = () => {
  const history = useHistory();
  const { issueNumber } = useParams<{ issueNumber: string }>();
  const { data, loading, error } = useQuery<GithubQuery, IssueVars>(GET_ISSUE, {
    variables: {
      owner: 'facebook',
      name: 'react',
      number: parseInt(issueNumber, 10),
      count: 10,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!data) return <div>Issue not found.</div>;

  const issue = data.repository?.issue;

  const handleOnClick = (e: React.MouseEvent) => {
    history.goBack();
  };

  return (
    <div className="max-w-4xl mx-auto p-10">
      <a
        className="p-2 mb-2 ml-4 bg-black text-white rounded-lg w-1/6 text-center inline-block cursor-pointer"
        onClick={handleOnClick}
      >
        Return
      </a>
      <div className="p-4 border border-gray-300 rounded-xl">
        <p>
          Issue:{' '}
          <a className="text-blue-500" href={issue?.url}>
            #{issue?.number}
          </a>
        </p>
        <h2 className="text-xl font-bold">{issue?.title}</h2>
        <p className="p-2">{issue?.bodyText}</p>
      </div>
      <div className="p-6">
        <p className="text-md font-bold">Comments</p>
        {issue?.comments.edges?.map((edge) => (
          <p className="border-b py-4" key={`${issue.id}-${edge?.node?.id}`}>
            {edge?.node?.bodyText}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Issue;
