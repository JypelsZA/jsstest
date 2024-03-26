$(document).ready(function () {
  const clickedMemeIds = JSON.parse(localStorage.getItem("clickedMemes")) || [];

  clickedMemeIds.forEach(function (memeId) {
    $(`.memes-row[data-meme-id="${memeId}"]`).addClass("highlighted-row");
  });

  $(".btn-view-details").click(function (event) {
    const memeId = $(this).closest(".memes-row").data("meme-id");

    if (!clickedMemeIds.includes(memeId)) {
      clickedMemeIds.push(memeId);

      localStorage.setItem("clickedMemes", JSON.stringify(clickedMemeIds));

      $(this).closest(".memes-row").addClass("highlighted-row");
    }
  });
});
