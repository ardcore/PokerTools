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

        helpers.drawOval(canvasW/2, canvasH/2, 650, 350, 'rgba(47, 47, 46, 1)', 20, 'rgba(70, 99, 13, 0.8)');
        this.drawSeats(10, 0, canvasW/2, canvasH/2, 650, 350, 35, 'rgba(47, 47, 46, 0.5)', 15, '#000');

        //HandReplay.Cards.create("Ad", 5, 5);


    },

    seats : function() {

    },

    /**
     * Puts n chairs regularly on the given ellipse- parametric style
     * @co-author ForestierSimon (logic behind seat placing)
     * @param int chairsAmount  number of chairs to be put
     * @param float startAngle angle offset (in radians) used to set the first point position
     * @param int cx            oval centre horizontal coordinate
     * @param int cy            oval centre vertical coordinate
     * @param int width         shape width
     * @param int height        shape height
     * @param string stroke     optional stroke style (rgba or hash)
     * @param int strokesize    optional stroke size
     * @param string fill       optional fill style (rgba or hash); fill will not be applied if undefined
     */
    drawSeats : function(amount, startAngle, cx, cy, width, height, radius, stroke, strokesize, fill) {
        var ctx = HandReplay.Facade.data.context;
        var i, a, b, x, y, twoPi, ang;

        a = width / 2;
        b = height / 2;
        twoPi = Math.PI * 2;

        for (i = 0; i <= amount; ++i) {
            ang = startAngle + twoPi * i / amount;
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