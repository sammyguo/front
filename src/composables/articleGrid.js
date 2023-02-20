export default function articleGrid() {
    const image_if_exists = (article) => {
      return imageIfExists(article)
    };

    const grid_style = (article) => {
      return gridStyle(article)
    }

    return {
        image_if_exists,
        grid_style
    }
}


function imageIfExists(article) {
      if (article.avatar) {
        return article.avatar.content
      }
    }

function gridStyle(article) {
      if (article.avatar) {
        return {
          display: 'grid',
          gridTemplateColumns: '1fr 4fr'
        }
      }
    }