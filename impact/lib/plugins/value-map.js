/**
 * Impact Plugin value-map.js : Value for tiles
 * Optionally Creates collision map tiles.
 * Optionally Removes collision tiles when value hits 0.
 * Optionally Restores Collision Tiles when Max value set.
 * Note: Graphical resources (numbered tile sets) can be found at www.spritesheet.net.
 * User: Stuart Tresadern
 * Date: 09.07.12
 * Time: 22:00
 * Version 1.0.1.
 */
ig.module(
    'plugins.value-map'
)
    .requires(
    'impact.map'
)
    .defines(function () {
        ig.ValueMap = ig.Map.extend(
            {
                removeCollision:true,
                restoreCollision:false,
                maxValue:20,

                init:function (tilesize, data, createCollisions) {

                    if (createCollisions) {
                        for (var y = 0; y < data.length; ++y) {
                            var row = data[y];
                            for (var x = 0; x < row.length; ++x) {

                                if (data[y][x] > 0) {
                                    ig.game.collisionMap.data[y][x] = 1;
                                }

                            }
                        }

                    }

                    this.parent(tilesize, data);

                },
                decreaseValue:function (x, y, value) {

                    var currentValue = this.getTile(x, y);

                    if (currentValue <= 1) {
                        return 0;
                    }

                    var nValue = currentValue - value;

                    if (nValue <= 1) nValue = 1;

                    this.setTile(x, y, nValue);

                    if (this.removeCollision && nValue == 1) {
                        ig.game.collisionMap.setTile(x, y, 0);
                    }

                    return nValue;

                },
                increaseValue:function (x, y, value) {
                    var currentValue = this.getTile(x, y);
                    var nValue = currentValue + value;
                    if (nValue > this.maxValue) nValue = this.maxValue;

                    this.setTile(x, y, nValue);

                    if (this.restoreCollision && nValue == this.maxValue) {
                        ig.game.collisionMap.setTile(x, y, 0);
                    }

                    return nValue;

                },
                setValue:function (x, y, value) {
                    var nValue = value + 1;

                    if (nValue > this.maxValue) nValue = this.maxValue;

                    this.setTile(x, y, nValue);

                    if (this.removeCollision && nValue == 1) {
                        ig.game.collisionMap.setTile(x, y, 0);
                    }

                    if (this.restoreCollision && nValue == this.maxValue) {

                        ig.game.collisionMap.setTile(x, y, 0);
                    }

                },
                getValue:function (x, y) {
                    var nValue = this.getTile(x, y);
                    return nValue - 1;
                }

            });

    });
