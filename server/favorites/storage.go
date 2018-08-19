package favorites

import (
	"github.com/jinzhu/gorm"
)

type Storage struct {
	*gorm.DB
}

func NewStorage(db *gorm.DB) (*Storage, error) {
	return &Storage{db}, nil
}

func (s *Storage) GetAll() ([]Favorite, error) {
	var response []Favorite

	if query := s.DB.Find(&response); query.Error != nil {
		return response, query.Error
	}

	return response, nil
}

func (s *Storage) Create(id int64) error {
	var fav = Favorite{OpenWeatherID: id}

	s.DB.Create(&fav)

	return nil
}

func (s *Storage) Delete(id uint64) error {
	if query := s.DB.Where("open_weather_id = ?", id).Delete(Favorite{}); query.Error != nil {
		return query.Error
	}

	return nil
}
