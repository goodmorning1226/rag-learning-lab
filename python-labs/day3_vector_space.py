# 用歐式距離觀察：兩個咖啡句子比較近，咖啡 vs 報稅比較遠。

def distance(a, b):
    return sum((x - y) ** 2 for x, y in zip(a, b)) ** 0.5

coffee1 = [1, 1, 1, 0, 0]   # 咖啡 / 水溫 / 苦
coffee2 = [1, 0, 0, 1, 0]   # 咖啡 / 烘焙
tax     = [0, 0, 0, 0, 1]   # 報稅

print(round(distance(coffee1, coffee2), 2))  # 1.73：兩個咖啡句較近
print(round(distance(coffee1, tax), 2))      # 2.0 ：咖啡 vs 報稅較遠
