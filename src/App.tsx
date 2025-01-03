import { useState, useCallback, useEffect, useMemo } from "react";
import { Button, Flex, Input, Layout, List, Space, Tag } from "antd";

interface Article {
  title: string;
  summary: string;
  time: string;
  image: string;
  tags: string[];
  link: string;
}

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useState("");

  const data = useMemo(() => {
    if (!keyword) {
      return articles;
    }
    return articles?.filter((article) => article?.title?.includes(keyword));
  }, [articles, keyword]);
  useEffect(() => {
    fetch("./articles/2024.json")
      .then((response) => response.json())
      .then((data) => setArticles(data));
  }, []);
  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Header style={{ padding: "12px 16px", height: "auto" }}>
        <Flex>
          <Input.Search
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onSearch={() => setKeyword(value)}
          />
        </Flex>
      </Layout.Header>
      <Layout.Content style={{ overflow: "auto" }}>
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={data}
          rowKey="link"
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<a href={item.link}>{item.title}</a>}
                description={
                  <Flex justify="space-between" align="center">
                    <Space>
                      {item.tags?.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </Space>
                    <span>{item.time}</span>
                  </Flex>
                }
              />
            </List.Item>
          )}
        />
      </Layout.Content>
    </Layout>
  );
}
