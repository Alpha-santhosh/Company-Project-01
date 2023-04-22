import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSagaData } from '../redux/Action';

function Github() {
  const gitRepoData = useSelector((state) => state.setData);
  const [data, setData] = useState([]);
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

  return (
    (data.length > 1) ? (
      <div className="github">
        <h4>Current page : {page}</h4>
        <br />
        <div className="footer_btn">
          {!((page - 1) === 0) ? (<button type='button' onClick={() => {
            if (page > 1) {
              setpage((page) => page - 1)
              disptach(getSagaData(page - 1))
            }
          }}><a href='#app'>page {page - 1}</a></button>) : ('')}

          <button type='button' onClick={() => {
            setpage((page) => page + 1)
            disptach(getSagaData(page + 1))
          }}><a href='#app'>page {page + 1}</a></button>
        </div>
        <br />
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
                  </div>
                  <div className='time'>Last pushed {lastPush} by {user_name}</div >
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
                {/* <Chart folder={repoName} owner={user_name} /> */}
                <h4>HighChart is not working in github and also in vercel, During depolyment stage it's not supportting highcharts. <br />I am working on it soon it will be updated.... under development</h4>
              </div>) : ('')}
            </div>
          })
        }
        <div className="footer_btn">
          {!((page - 1) === 0) ? (<button type='button' onClick={() => {
            if (page > 1) {
              setpage((page) => page - 1)
              disptach(getSagaData(page - 1))
            }
          }}><a href='#app'>page {page - 1}</a></button>) : ('')}

          <button type='button' onClick={() => {
            setpage((page) => page + 1)
            disptach(getSagaData(page + 1))
          }}><a href='#app'>page {page + 1}</a></button>
        </div>
      </div>) : (<><h1>...Loading</h1></>)

  )
}

export default Github;