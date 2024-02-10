describe('todolist', () => {
  it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto('http://localhost:9009/iframe.html?viewMode=story&id=todolists-todolists--todolists-story&args=',
      {waitUntil: "networkidle2"});

    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});
