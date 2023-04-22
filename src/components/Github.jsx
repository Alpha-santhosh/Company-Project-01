import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSagaData } from '../redux/Action';
import Chart from './Chart';

function Github() {
  const gitRepoData = useSelector((state) => state.setData);
  const [data, setData] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const NumOfData = 10;
  const [page, setpage] = useState(1);
  const disptach = useDispatch();
  const [expand, setexpand] = useState('');
  useEffect(() => {
    if (Array.isArray(gitRepoData)) {
      const repoData = gitRepoData.map((e) => {
        const { description, name, owner, stargazers_count, open_issues_count, pushed_at } = e;
        const { avatar_url, login } = owner;
        return {
          avatar: avatar_url,
          repoName: name,
          desp: description,
          stars: stargazers_count,
          issue: open_issues_count,
          lastPush: pushed_at,
          user_name: login,
        };
      });
      setData(repoData);
    }
  }, [gitRepoData]);

  // const lastIndex = CurrentPage * NumOfData;
  // const firstIndex = lastIndex - NumOfData;
  // const dataToShow = data.slice(firstIndex, lastIndex);
  // console.table(dataToShow);
  return (
    (data.length > 1) ? (<div className="github">
      {
        data.map((e) => {
          const { avatar, repoName, desp, stars, issue, lastPush, user_name } = e;
          return <div className="card">
            <div className="card_top">
              <div className="right">
                <img src={avatar} alt="" />
              </div>
              <div className="left">
                <div className="top">
                  <h2>{repoName}</h2>
                  <p>{desp}</p>
                </div>
                <div className="btns">
                  <span>
                    Stars : {stars}
                  </span>
                  <span>
                    Issues : {issue}
                  </span>
                  <div className='time'>Last pushed {lastPush} by {user_name}</div >
                </div>
              </div>
              <div className="expand">
                <button type='button' className='drop_btn' style={(expand.name === repoName && expand.status === true) ? { transform: "rotate(0deg)" } : { transform: "rotate(-90deg)" }} onClick={() => {
                  if (expand.name === repoName && expand.status === true) {
                    setexpand({ name: repoName, status: false })
                  } else {
                    setexpand({ name: repoName, status: true })
                  }
                  console.log(repoName)
                }}><span class="material-symbols-outlined">
                    expand_more
                  </span></button>
              </div>
            </div>
            {(expand.name === repoName && expand.status) ? (<div className="graph" style={(expand.name === repoName && expand.status) ? ({ display: "block" }) : ({ display: "none" })}>
              <Chart folder={repoName} owner={user_name} />
            </div>) : ('')}
          </div>
        })
      }</div>) : (<><h1>...Loading</h1></>)

  )
}

export default Github;