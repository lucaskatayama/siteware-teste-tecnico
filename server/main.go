package main

import (
	"fmt"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"

	fav "github.com/diegoprates/siteware-test/server/favorites"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

var (
	host     = os.Getenv("POSTGRES_HOST")
	user     = os.Getenv("POSTGRES_USER")
	password = os.Getenv("POSTGRES_PASSWORD")
	pgdb     = os.Getenv("POSTGRES_DB")
)

// NewDB connect to a postgres database
func NewDB() (*gorm.DB, error) {
	conn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=disable", host, user, password, pgdb)
	dbConn, err := gorm.Open("postgres", conn)
	if err != nil {
		return nil, err
	}

	dbConn.AutoMigrate(&fav.Favorite{})

	return dbConn, nil
}

func main() {
	db, err := NewDB()
	if err != nil {
		// in a real word situation  would not panic but log, and try to connect again in a few minutes, incrementing time until some limit.
		panic("failed to connect to database")
	}
	defer db.Close()

	server := echo.New()

	// Middlewares
	server.Use(middleware.Logger())
	server.Use(middleware.Recover())
	server.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:8080"},
		AllowMethods:     []string{echo.GET, echo.POST, echo.DELETE, echo.OPTIONS},
		AllowCredentials: true,
	}))

	// Favorites module init
	favoritesRepository, err := fav.NewStorage(db)
	if err != nil {
		fmt.Println("error initializing favorites module")
	}
	favorites := fav.Init(favoritesRepository)

	// Routes
	apiGroup := server.Group("/api/v1")
	apiGroup.GET("/favorites", favorites.GetAll)
	apiGroup.POST("/favorites", favorites.Create)
	apiGroup.DELETE("/favorites/:id", favorites.Delete)

	server.Logger.Fatal(server.Start(":5000"))
}
