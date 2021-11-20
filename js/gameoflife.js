const canv = document.getElementById("canv");
var ctx = canv.getContext("2d");

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

var focused = true;

canv.width = screenWidth;
canv.height = screenHeight;

var grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var mirrorGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var gridW = 15;
var gridH = 15;

window.addEventListener("focus", () => {
  if (focused != true)
  {
    focused = true;
  }
});

window.addEventListener("blur", () => {
  if (focused == true)
  {
    focused = false;
  }
})

var draw = function()
{
    ctx.clearRect(0, 0, screenWidth, screenHeight);

    for (var i = 0; i < gridW + 1; i++)
    {
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(i * 32, 0, 1, gridH * 32);
    }

    for (var j = 0; j < gridH + 1; j++)
    {
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, j * 32, gridW * 32, 1);
    }

    for (var y = 0; y < grid.length; y++)
    {
        for (var x = 0; x < grid[y].length; x++)
        {
            var tileX = x * 32;
            var tileY = y * 32;

            if (y > 0 && x > 0 && y < 14 && x < 14)
            {
                if (grid[y][x] == 1)
                {
                    ctx.fillStyle = "rgb(255, 255, 0)";
                    ctx.fillRect(tileX, tileY, 32, 32);
                }
            }
        }
    }
}

var update = function()
{
    for (var y = 0; y < grid.length; y++)
    {
        for (var x = 0; x < grid[y].length; x++)
        {
            if (y > 0 && x > 0 && y < 14 && x < 14)
            {
                if (grid[y][x] == 1 || grid[y][x] == 0)
                {
                    var totalCells = 0;

                    totalCells += grid[y - 1][x - 1];
                    totalCells += grid[y - 1][x];
                    totalCells += grid[y - 1][x + 1];
                    totalCells += grid[y][x - 1];
                    totalCells += grid[y][x + 1];
                    totalCells += grid[y + 1][x - 1];
                    totalCells += grid[y + 1][x];
                    totalCells += grid[y + 1][x + 1];

                    if (grid[y][x] == 0)
                    {
                        switch(totalCells)
                        {
                            case 3:
                                mirrorGrid[y][x] = 1;
                                break;
                            default:
                                mirrorGrid[y][x] = 0;
                        }
                    } else
                    {
                        if (grid[y][x] == 1)
                        {
                            switch(totalCells)
                            {
                                case 0:
                                case 1:
                                    mirrorGrid[y][x] = 0;
                                    break;
                                case 2:
                                case 3:
                                    mirrorGrid[y][x] = 1;
                                    break;
                                case 4:
                                case 5:
                                case 6:
                                case 7:
                                case 8:
                                    mirrorGrid[y][x] = 0;
                                    break;
                                default:
                                    mirrorGrid[y][x] = 0;
                            }
                        }
                    }
                }
            }
        }
    }

    for (var j = 0; j < gridH; j++)
    {
        for (var i = 0; i < gridW; i++)
        {
            grid[j][i] = mirrorGrid[j][i];
        }
    }
}

var loop = function()
{
    setInterval(() => {
        update();
        draw();
    }, 100);
}

loop();
