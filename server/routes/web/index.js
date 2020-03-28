module.exports = app => {
    const router = require('express').Router();
    const mongoose = require('mongoose');
    const Mock = require('mockjs');
    const Article = mongoose.model('Article');
    const Category = mongoose.model('Category');
    const Hero = mongoose.model('Hero');

    // 导入新闻数据
    router.get('/news/init', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻分类',
        });
        const cats = await Category.find().where({
            parent
        }).lean();
        const newsTitles = Array(20).fill(Mock.mock('@title'));
        const newsList = newsTitles.map(title => {
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5);
            return {
                title: title,
                categories: randomCats.slice(0, 1),
            };
        });
        await Article.deleteMany({});
        await Article.insertMany(newsList);

        res.send(newsList);
    });

    // 新闻列表
    router.get('/news/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻分类',
        });
        // 聚合查询
        const cats = await Category.aggregate([
            {
                $match: { parent: parent._id },
            },
            {
                // 级联查询
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList',
                }
            },
            {
                $addFields: {
                    newsList: {
                        $slice: ['$newsList', 5]
                    }
                }
            }
        ]);
        const subCats = cats.map(v => v._id);
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).populate("categories").limit(5).lean(),
        });

        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name;
                return news;
            });
            return cat;
        })

        res.send(cats);
    });

    // 导入英雄数据
    router.get('/heroes/init', async (req, res) => {
        const rawData = [
            {
                name: '热门',
                heroes: [
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                ]
            },
            {
                name: '战士',
                heroes: [
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                ]
            },
            {
                name: '法师',
                heroes: [
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                ]
            },
            {
                name: '刺客',
                heroes: [
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                    {
                        name: '后羿',
                        avatar: 'http://localhost:3000/uploads/0ae2e3bd6854fca07908399b0ab3984a',
                    },
                ]
            },
        ];
        //  await Hero.deleteMany({})
        for (let cat of rawData) {
            if (cat.name === '热门') {
                continue;
            }
            const category = await Category.findOne({
                name: cat.name,
            });
            cat.heroes = cat.heroes.map(hero => {
                hero.categories = [category];
                return hero;
            });
            await Hero.insertMany(cat.heroes);
        }

        res.send(await Hero.find());
    });

    // 英雄列表
    router.get('/heroes/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '英雄分类',
        });
        // 聚合查询
        const cats = await Category.aggregate([
            {
                $match: { parent: parent._id },
            },
            {
                // 级联查询
                $lookup: {
                    from: 'heroes',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'heroList',
                }
            },
        ]);
        const subCats = cats.map(v => v._id);
        cats.unshift({
            name: '热门',
            heroList: await Hero.find().where({
                categories: { $in: subCats }
            }).limit(10).lean(),
        });

        res.send(cats);
    });

    // 文章详情
    router.get('/articles/:id', async (req, res) => {
        const data = await Article.findById(req.params.id).lean();
        data.related = await Article.find().where({
            categories: { $in: data.categories }
        }).limit(5);
        res.send(data);
    });

     // 英雄详情
     router.get('/heroes/:id', async (req, res) => {
        const data = await Hero.findById(req.params.id).populate('categories items1 item2 partners.hero').lean();
        
        res.send(data);
    });

    app.use('/web/api', router);
}