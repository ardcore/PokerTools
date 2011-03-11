/*
    PokerTools
    @package HandReplay
    Cards

    Card creation and effects
    
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

HandReplay.Cards = {

    create : function(name, x, y) {
        var self = this;
        return new self.Card(name, x, y).init();
    },

    Card : function(name, x, y) {

        var suits = {
            h : '♥',
            d : '♦',
            c : '♣',
            s : '♠'
        };

        var width = 50,
        height = 70,
        fadeInterval = null,
        font = '18px serif',
        shapefont = '40px serif',
        radius = 3,
        helpers = HandReplay.CanvasHelpers,
        ctx = HandReplay.Facade.data.context,
        self = this;

        // public members
        Object.defineProperties(this, {
            x : {
                value : x
            },

            y : {
                value : y
            },

            fps : {
                value : 60
            },

            interval : {
                value : 1000 //ms
            },

            fill : {
                value : {
                    r : 0,
                    g : 0,
                    b : 0,
                    a : 1,
                    toString: function() {
                        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
                    }
                }

            }
        });

        this.draw = function() {
            var details = this.parseCardName(name);
            var fontcolour = (details.suit === 's' || details.suit === 'c') ? 'Black' : 'Red';

            ctx.clearRect(this.x, this.y, width, height);
            helpers.drawRoundedRectangle(this.x, this.y, width, height, radius, '#000', 1, this.fill.toString());

            ctx.beginPath();
            ctx.moveTo(this.x + width, this.y + height/4);
            ctx.lineTo(this.x + width/3, this.y + height/4);
            ctx.lineTo(this.x + width/3, this.y + height);
            ctx.stroke();

            helpers.drawText(this.x + width/6, this.y + height/8, details.label, font, fontcolour, 'middle', 'center');
            helpers.drawText(this.x + width/6, this.y + height/3, suits[details.suit], font, fontcolour, 'middle', 'center');
            helpers.drawText(width - width/3 + this.x, height - height/2.5 + this.y, suits[details.suit], shapefont, fontcolour, 'middle', 'center');
        }

        this.parseCardName = function(name) {
            return {
                suit : name.charAt(name.length-1),
                label : name.substring(0, name.length-1)
            }
        }

        this.fadeIn = function() {
            
            if (self.fill.r <= 255) {
                self.draw();
                self.fill.r = self.fill.g = self.fill.b += 5;
            } else {
                clearInterval(self.fadeInterval);
            }
        }

        this.init = function() {
            //this.fadeIn();
           this.fadeInterval = setInterval(this.fadeIn, this.interval/this.fps);

        }
    }
};