import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './IssueLink.module.scss';

type IssueLinkProps = {
  title: string;
  number: number;
};

export const IssueLink: FC<IssueLinkProps> = ({ title, number }) => (
  <Link
    className={`${styles.issueLink} p-3 hover:underline`}
    to={`/issue/${number}`}
  >
    {title} <span className="text-blue-500">#{number}</span>
  </Link>
);
