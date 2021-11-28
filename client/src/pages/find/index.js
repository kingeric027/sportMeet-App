
import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Container } from "../../components/Grid";
import API from "../../utils/API";
import Navbar from "../../components/navbar/index";
import FindGameMap from "../../components/Maps/FindMap";
import { GameList, GameListItem } from '../../components/gameItem';
import "./style.css";
import { useAuth0 } from "@auth0/auth0-react";

const Find = (props) => {
    const [findState, setFindState] = useState({ games: [] })
    const { isAuthenticated, loginWithRedirect, user } = useAuth0()


    const loadGames = useCallback(() => {
        API.getFutureGames()
            .then(res => {
                setFindState({ games: res.data })
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if (!isAuthenticated) {
            loginWithRedirect()
        }
        loadGames();
        console.log(findState.games);
    }, [isAuthenticated, loadGames])

    const deleteGame = (id) => {
        API.deleteGame(id)
            .then(res => loadGames())
            .catch(err => console.log(err));
    }


    const updateGame = (index) => {
        if (!isAuthenticated) {  //If not logged in make user log in before joining game.
            loginWithRedirect()
        }
        const gameToChange = findState.games[index] //this.state.games[index];
        if (gameToChange.playersArray.includes(user.name)) {
            gameToChange.players = gameToChange.players + 1;
            gameToChange.playersArray.splice(gameToChange.playersArray.indexOf(user.name), 1);
        } else {
            gameToChange.players = gameToChange.players - 1;
            gameToChange.playersArray.push(user.name);
        }
        API.updateGame(gameToChange._id, gameToChange)
            .then(res => loadGames())
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Navbar></Navbar>
            <Container>
                <h3 className="findHeader"><strong>Upcoming Games</strong></h3>
                <hr></hr>
                <Row>
                    <Col size="md-4">
                        <GameList>
                            {findState.games.map((game, index) => {
                                return (
                                    <GameListItem
                                        key={game._id}
                                        id={game._id}
                                        user={game.user}
                                        sport={game.sport}
                                        players={game.players}
                                        playersArray={game.playersArray}
                                        time={game.time}
                                        date={game.date}
                                        address={game.address}
                                        coords={game.location}
                                        DeleteFunction={() => deleteGame(game._id)}
                                        UpdateFunction={() => updateGame(index)} //Need to decrease players by one
                                    >
                                    </GameListItem>
                                )
                            })}
                        </GameList>
                    </Col>
                    <Col size="md-8">
                        <div>
                            <FindGameMap
                                gamesArray={findState.games}
                                google={props.google}
                                center={{ lat: 44.9740, lng: -93.227 }}
                                height='300px'
                                zoom={10}
                            >
                            </FindGameMap>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Find;