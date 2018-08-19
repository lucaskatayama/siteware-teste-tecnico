package favorites

import (
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo"
)

type Repository interface {
	GetAll() ([]Favorite, error)
	Create(id int64) error
	Delete(id uint64) error
}

type Favorite struct {
	ID            uint64     `json:"-" gorm:"primary_key"`
	OpenWeatherID int64      `json:"id"`
	CreatedAt     time.Time  `json:"-"`
	UpdatedAt     time.Time  `json:"-"`
	DeletedAt     *time.Time `json:"-" sql:"index"`
}

type Handler struct {
	Repository
}

func (h *Handler) GetAll(c echo.Context) (err error) {
	favs, err := h.Repository.GetAll()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "could not get favorites")
	}

	return c.JSON(http.StatusOK, favs)
}

type createRequest struct {
	ID int64 `json:"id"`
}

func (h *Handler) Create(c echo.Context) (err error) {
	req := new(createRequest)

	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, "bad request")
	}

	if err := h.Repository.Create(req.ID); err != nil {
		return c.JSON(http.StatusInternalServerError, "could not insert favorite")
	}

	return c.JSON(http.StatusCreated, nil)
}

func (h *Handler) Delete(c echo.Context) (err error) {
	id := c.Param("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, "missing favorite id")
	}

	favID, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "could parse favorite id")
	}

	if err := h.Repository.Delete(favID); err != nil {
		return c.JSON(http.StatusInternalServerError, "could not delete favorite")
	}

	return c.JSON(http.StatusOK, nil)
}

func Init(repository Repository) *Handler {
	return &Handler{
		repository,
	}
}
