import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import { logDOM } from "@testing-library/dom";
const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [requests, setRequests] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    // console.log(user);
    setisLoading(true);
    toggleError();
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) => {
      console.log(err);
    });
    console.log(response);
    if (response) {
      setGithubUser(response.data);
    } else {
      toggleError(true, "no user found");
    }
    checkRequests();
    setisLoading(false);
  };

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;

        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "sorry you've exeeded the hourly limit!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function toggleError(show = "false", msg = " ") {
    setError({ show, msg });
  }

  useEffect(checkRequests, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
