/*
    PokerTools
    @package HandReplay
    Table

    Table drawing and effects
    
    Copyright (C) 2011 Lukasz Nowacki

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

HandReplay.Table =  {

    init : function() {
        this.draw();
    },

    draw : function() {
        var ctx = HandReplay.Facade.data.context,
        canvasW = HandReplay.Facade.data.canvasW,
        canvasH = HandReplay.Facade.data.canvasH,
        helpers = HandReplay.CanvasHelpers;

        helpers.drawEllipse(canvasW/2, canvasH/2, this.width, this.height, 'rgba(47, 47, 46, 1)', 20, 'rgba(70, 99, 13, 0.8)');
        this.drawSeats(0, canvasW/2, canvasH/2, 35, 'rgba(47, 47, 46, 0.5)', 15, '#000');
        this.dealCards(0);

        //HandReplay.Cards.create("Ad", 5, 5);
        //HandReplay.Cards.create("Jd", 5, 100);
    },

    players : function() {
        var players;

        // test purposes only - this will be extracted from hand history
        players = {
            1 : {
                cards : {
                    1 : 'Ad',
                    2 : 'Ks'
                }
            },

            2 : {
                cards : {
                    1 : '2s',
                    2 : '2c'
                }
            },

            6 : {
                cards : {
                    1 : 'Js',
                    2 : '5h'
                }
            },

            10 : {
                cards : {
                    1 : '10s',
                    2 : '10c'
                }
            }
        }

        return players;
    },

    dealCards : function(startAngle, cx, cy) {
        var i, ang, twoPi, a, b, counter;
        players = this.players();

        a = this.width / 2;
        b = this.height / 2;
        twoPi = Math.PI * 2;

        for (i = 1, counter = 0; i <= this.seats; ++i) {
            if (players.hasOwnProperty(i)) {
                (function(i, seats) {
	                var x, y;
	                setTimeout( function() {
		                ang = startAngle + twoPi * i / seats;
		                x = a * Math.cos(ang);
		                y = b * Math.sin(ang);
		                HandReplay.Cards.create(players[i].cards[1], HandReplay.Facade.data.canvasW/2 + x - 30, HandReplay.Facade.data.canvasH/2 + y - 40);
                        HandReplay.Cards.create(players[i].cards[2], HandReplay.Facade.data.canvasW/2 + x - 15, HandReplay.Facade.data.canvasH/2 + y - 35);
                    }, counter*1000);
	                counter++;
                })(i, this.seats)
            }
        }
    },

    /**
     * Puts n chairs regularly on the given ellipse- parametric style
     * @co-author ForestierSimon (logic behind seat placing)
     * @param float startAngle angle offset (in radians) used to set the first point position
     * @param int cx            table centre horizontal coordinate
     * @param int cy            table centre vertical coordinate
     * @param string stroke     optional stroke style (rgba or hash)
     * @param int strokesize    optional stroke size
     * @param string fill       optional fill style (rgba or hash); fill will not be applied if undefined
     */
    drawSeats : function(startAngle, cx, cy, radius, stroke, strokesize, fill) {
        var ctx = HandReplay.Facade.data.context;
        var i, a, b, x, y, twoPi, ang;

        a = this.width / 2;
        b = this.height / 2;
        twoPi = Math.PI * 2;

        for (i = 1; i <= this.seats; ++i) {
            ang = startAngle + twoPi * i / this.seats;
            x = a * Math.cos(ang);
            y = b * Math.sin(ang);
            
            ctx.beginPath();
            ctx.arc(cx + x, cy + y, radius, 0, twoPi, false);

            if (typeof strokesize !== 'undefined') {
                ctx.lineWidth = strokesize;
            }

            if (typeof stroke !== 'undefined') {
                ctx.strokeStyle = stroke;
            }
            ctx.stroke();

            if (typeof fill !== 'undefined') {
                ctx.fillStyle = fill;
                ctx.fill();
            }
        }
    }
};

Object.defineProperties(HandReplay.Table, {
    seats : {
        value : 10
    },

    width : {
        value : 650
    },

    height : {
        value : 350
    }
});