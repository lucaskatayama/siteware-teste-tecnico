package favorites

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/labstack/echo"
	"github.com/stretchr/testify/assert"
)

// mock favorites repository so we don't rely on DB to unit test
type mock struct{}

func (m *mock) GetAll() ([]Favorite, error) {
	favs := make([]Favorite, 0)
	favs = append(favs, Favorite{OpenWeatherID: 3447259})

	return favs, nil
}

func (m *mock) Create(id int64) error {
	return nil
}

func (m *mock) Delete(id uint64) error {
	return nil
}

func TestFavorites(t *testing.T) {
	favorites := Init(&mock{})

	t.Run("GetAll should return 200", func(t *testing.T) {
		rec, c := prepareTests(t, "GET", "/api/v1/favorites", strings.NewReader(``))
		if assert.NoError(t, favorites.GetAll(c)) {
			assert.Equal(t, http.StatusOK, rec.Code)
		}
	})

	t.Run("GetAll return should match json response", func(t *testing.T) {
		rec, c := prepareTests(t, "GET", "/api/v1/favorites", strings.NewReader(``))
		if assert.NoError(t, favorites.GetAll(c)) {
			assertResponseBody(t, rec.Body.String(), `[{"id":3447259}]`)
		}
	})

	t.Run("Create should return 201", func(t *testing.T) {
		rec, c := prepareTests(t, "POST", "/api/v1/favorites", strings.NewReader(`{"id": 1234}`))
		if assert.NoError(t, favorites.Create(c)) {
			assert.Equal(t, http.StatusCreated, rec.Code)
		}
	})

	t.Run("Delete should return 400 if id param is missing", func(t *testing.T) {
		rec, c := prepareTests(t, "DELETE", "/api/v1/favorites", strings.NewReader(``))
		if assert.NoError(t, favorites.Delete(c)) {
			assert.Equal(t, http.StatusBadRequest, rec.Code)
		}
	})

	t.Run("Delete should return 200", func(t *testing.T) {
		rec, c := prepareTests(t, "DELETE", "/api/v1/favorites", strings.NewReader(``))
		c.SetParamNames("id")
		c.SetParamValues("3447259")
		if assert.NoError(t, favorites.Delete(c)) {
			assert.Equal(t, http.StatusOK, rec.Code)
		}
	})
}

func prepareTests(t *testing.T, method string, path string, body *strings.Reader) (*httptest.ResponseRecorder, echo.Context) {
	t.Helper()

	e := echo.New()

	req := httptest.NewRequest(method, path, body)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()

	c := e.NewContext(req, rec)

	return rec, c
}

func assertResponseBody(t *testing.T, got, want string) {
	t.Helper()

	if got != want {
		t.Errorf("response body is wrong, got '%s' want '%s'", got, want)
	}
}
