'use strict';

import React from 'react';

// Constants
const PLAYER_X = 'PLAYER_TURN_X';
const PLAYER_O = 'PLAYER_TURN_O';
const PLAYER_NONE = 'PLAYER_NONE';
const PLAYER_SYMBOL_MAP = {
    [PLAYER_X]: 'X',
    [PLAYER_O]: 'O'
};

export default class TicTacToe extends React.PureComponent {
    constructor (props) {
        super(props);
        const { size = 3 } = props;

        this.state = {
            board: this._createBoard(size),
            turn: PLAYER_X,
            size
        };
    }

    _createBoard (size) {
        const board = [];
        for (let row = 0; row < size; row++) {
            board[row] = [];
            for (let col = 0; col < size; col++) {
                board[row][col] = {
                    value: PLAYER_NONE,
                    col,
                    row
                };
            }
        }
        return board;
    }

    render () {
        const { board, turn, win, full, winner } = this.state;
        const tie = !win && full;
        const finished = win || full;

        return (
            <div className='game-container'>
                <div className='tic-tac-toe'>
                    {
                        board.map((row)  => {
                            return (
                                <div className='row'>
                                    {
                                        row.map(cell => {
                                            const { value } = cell;
                                            const onClick = (e) => this._handleCellClick(cell, e);
                                            return (
                                                <div className='column' onClick={onClick}>
                                                    <span className='cell-text'>
                                                        {PLAYER_SYMBOL_MAP[value]}
                                                    </span>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                </div>
                <div className='game-details'>
                    {
                        win ? (
                            <span>{`Winner: ${PLAYER_SYMBOL_MAP[winner]}`}</span>
                        ) : tie ? (
                            <span>You Tied</span>
                        ) : (
                            <span>{`Current Turn: ${PLAYER_SYMBOL_MAP[turn]}`}</span>
                        )
                    }
                </div>
            </div>
        );
    }

    _handleCellClick = (cell, e) => {
        console.log('cell', cell);
        const { row, col } = cell;
        const { board, turn, win, full } = this.state;

        if (win || full) {
            return;
        }

        if (board[row][col].value === PLAYER_NONE) {
            // Click an available cell
            board[row][col].value = turn;

            const gameState = this._checkWin(cell, turn);
            this.setState({
                board,
                turn: turn === PLAYER_X ? PLAYER_O : PLAYER_X,
                ...gameState
            });
        }
    }

    _checkWin = (cell, turn) => {
        const { row, col } = cell;
        const { board } = this.state;

        // Check rows
        let rowCount = 0;
        for (let c = 0; c < board.length; c++) {
            if (board[row][c].value === turn) {
                rowCount++;
            }
        }

        console.log('rowCount', rowCount);

        // Check cols
        let colCount = 0;
        for (let r = 0; r < board.length; r++) {
            if (board[r][col].value === turn) {
                colCount++;
            }
        }

        console.log('colCount', colCount);

        // Check left diagonal
        let leftDiagCount = 0;
        let rightDiagCount = 0;
        for (let d = 0; d < board.length; d++) {
            let rd = (board.length - 1) - d;
            if (board[d][d].value === turn) {
                leftDiagCount++;
            }

            if (board[d][rd].value === turn) {
                rightDiagCount++;
            }
        }
        console.log('leftDiagCount', leftDiagCount);
        console.log('rightDiagCount', rightDiagCount);

        const win = [rowCount, colCount, leftDiagCount, rightDiagCount].some(count => count === board.length);
        const full = [rowCount, colCount, leftDiagCount, rightDiagCount].every(count => count === board.length);
        const winner = win ? turn : PLAYER_NONE;

        console.log('win', win);
        console.log('full', full);
        console.log('winner', winner);
        return {
            win,
            winner,
            full
        };
    }
}
